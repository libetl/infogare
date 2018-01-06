import React from 'react'
import KeyEvent from './keyboard/keyEvent'
import core from './core'
import Timetable from './components/timetable'
import {AsyncStorage} from './wrapper'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...props, settingsOpened: false,
            dataSources: [],
            allDataSourcesMetadata: core.dataSources,
            geo: {lat:48.880185,long:2.355151},
            dataSourceByFeature: {},
            highlightedComponent: null,
            timetable: {
                departures: new Array(10).fill({}), station: 'chargement...',
                displayNowColon:true, apiToken: undefined, currentlyUpdating: false
            }
        }
        this.updateTimetable = this.updateTimetable.bind(this)
        this.updateLocation = this.updateLocation.bind(this)
        this.abortChangeLocation = this.abortChangeLocation.bind(this)
        this.askForALocation = this.askForALocation.bind(this)
        this.changeLocation = this.changeLocation.bind(this)
        this.initNow = this.initNow.bind(this)
        this.tryGps = this.tryGps.bind(this)
        this.validateToken = this.validateToken.bind(this)
        this.viewOneDeparture = this.viewOneDeparture.bind(this)
        this.hideDetails = this.hideDetails.bind(this)
        this.openSettings = this.openSettings.bind(this)
        this.closeSettings = this.closeSettings.bind(this)
        this.onDataSourceListChange = this.onDataSourceListChange.bind(this)
        this.updateHightlightedComponent = this.updateHightlightedComponent.bind(this)
        this.toggleFavorite = this.toggleFavorite.bind(this)
    }
    componentWillUnmount() {
        KeyEvent.removeKeyDownListener()
        KeyEvent.removeKeyUpListener()
    }
    componentDidMount() {
        AsyncStorage.getItem('@store:navitiaToken').then(navitiaToken =>
            AsyncStorage.getItem('@store:apiToken').then(apiToken =>
                AsyncStorage.getItem('@store:dataSources').then(dataSources =>
                    AsyncStorage.getItem('@store:favoriteStations').then(favoriteStations => {
                        let foundDataSources
                        try{foundDataSources = JSON.parse(dataSources) || undefined}catch(e){}
                        let foundFavoriteStations
                        try{foundFavoriteStations = JSON.parse(favoriteStations) || undefined}catch(e){}
                        this.initNow(apiToken, navitiaToken,foundDataSources, foundFavoriteStations)}))))

        KeyEvent.onKeyUpListener(keyCode => {
            if (keyCode === 23 && this.state.highlightedComponent) {
                this.state.highlightedComponent.click()
                this.setState({highlightedComponent: null})
            }
        })
    }
    initNow(apiToken, navitiaToken, dataSources = ['terSncf', 'inMemory', 'liveMap'], favoriteStations = []) {
        this.setState({firstScrollY: 3, secondScrollY: 3, apiToken, navitiaToken, dataSources,
            dataSourceByFeature:core.minimalMappingFor(dataSources), favoriteStations})
        setInterval(this.updateTimetable, 60000)
        return this.updateLocation()
    }
    updateTimetable({geo, progressBar, closeLocationPrompt} = {geo: this.state.geo, progressBar: false, closeLocationPrompt: false}) {
        this.setState({geo, currentlyUpdating:progressBar ? true : this.state.currentlyUpdating,
            displayLocationPrompt: closeLocationPrompt ? false : this.state.displayLocationPrompt})
        const notify = progressBar ? this.setState.bind(this) : () => {}
        return core.nextDepartures(geo, {tokens: {sncfApi: this.state.apiToken, navitiaIo: this.state.navitiaToken},
                notify, dataSourceByFeature:this.state.dataSourceByFeature})
            .then((timetable) => this.setState({currentlyUpdating: false, timetable}))
    }
    askForALocation() {
        this.setState({displayLocationPrompt: !this.state.displayLocationPrompt})
    }
    abortChangeLocation() {
        this.setState({displayLocationPrompt: false})
    }
    changeLocation(geo) {
        return this.updateTimetable({geo, progressBar: true, closeLocationPrompt: true})
    }
    updateLocation() {
        return this.tryGps().then((geo = this.state.geo) => this.updateTimetable({geo, progressBar: true}))
    }
    tryGps({failsafe} = {failsafe:false}){
        return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(
            position => resolve({long: position.coords.longitude, lat: position.coords.latitude}),
            () => failsafe ? resolve() : this.tryGps({failsafe:true}), 
            {enableHighAccuracy: !failsafe, timeout: 2000, maximumAge: 10000}))
    }
    validateToken({type, newValue}) {
        core.testToken({type, newValue})
            .then(() => AsyncStorage.setItem(`@store:${type}`, newValue))
            .then(() => this.setState({[type]: newValue}))
            .catch((e) => this.setState({loginError:e.message}))
    }
    viewOneDeparture(num) {
        this.setState({departureDetails: this.state.timetable.departures[num]})
    }
    hideDetails() {
        this.setState({departureDetails: undefined})
    }
    openSettings() {
        this.setState({settingsOpened: true})
    }
    closeSettings() {
        this.setState({settingsOpened: false})
    }
    onDataSourceListChange(dataSource, isItAnAddOperation) {

        const metadata = this.state.allDataSourcesMetadata

        if (isItAnAddOperation && metadata[dataSource].betterServedWith) {
            const dataSources = [dataSource, ...metadata[dataSource].betterServedWith]
            const minimalMapping = core.minimalMappingFor(dataSources)
            return AsyncStorage.setItem('@store:dataSources', JSON.stringify(dataSources)).then(() =>
                this.setState({dataSources, dataSourceByFeature: minimalMapping}))
        }

        const newDataSourceShadows = otherDataSource =>
            metadata[otherDataSource].features.every(entry => metadata[dataSource].features.includes(entry))

        const dataSourcesWithMaybeUselessSources =
            isItAnAddOperation ?
                [dataSource].concat(
                    this.state.dataSources.filter(oneDataSource => !newDataSourceShadows(oneDataSource))) :
                /*in case of removal*/
                this.state.dataSources.filter(oneDataSource => oneDataSource !== dataSource)
        const minimalMapping = core.minimalMappingFor(dataSourcesWithMaybeUselessSources)
        const reallyUsedSources = Array.from(new Set(Object.values(minimalMapping)))
        const dataSources = dataSourcesWithMaybeUselessSources
            .filter(dataSource => reallyUsedSources.includes(dataSource))
        return AsyncStorage.setItem('@store:dataSources', JSON.stringify(dataSources)).then(() =>
            this.setState({dataSources, dataSourceByFeature: minimalMapping}))
    }
    updateHightlightedComponent(component) {
        this.setState({highlightedComponent:component})
    }
    toggleFavorite(stationName) {
        const oldList = this.state.favoriteStations || []
        const newList = oldList.includes(stationName) ? oldList.filter(name => name !== stationName) :
            [...oldList, stationName]
        this.setState({favoriteStations: newList})

        return AsyncStorage.setItem('@store:favoriteStations', JSON.stringify(newList))
    }
    render() {
        return (<Timetable suggestStations={core.suggestStations}
                           displayLocationPrompt={this.state.displayLocationPrompt}
                           timetable={this.state.timetable} parent={this}
                           updateHightlightedComponent={this.updateHightlightedComponent}/>)
    }
}
