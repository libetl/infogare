import React from 'react'
import moment from 'moment'
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
                firstScrollY: 3, secondScrollY: 3, stopsListOfRow1Height: 0, stopsListOfRow2Height: 0,
                displayNowColon:true, apiToken: undefined, currentlyUpdating: false
            }
        }
        this.stopsListOfRow1 = {}
        this.stopsListOfRow2 = {}
        this.autoScroll = this.autoScroll.bind(this)
        this.refreshScreen = this.refreshScreen.bind(this)
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
    }
    componentWillUnmount() {
        KeyEvent.removeKeyDownListener()
        KeyEvent.removeKeyUpListener()
      }
    componentDidMount() {
        AsyncStorage.getItem('@store:apiToken').then(apiToken =>
            AsyncStorage.getItem('@store:dataSources').then(dataSources => {
                let foundDataSources
                try{foundDataSources = JSON.parse(dataSources) || undefined}catch(e){}
                this.initNow(apiToken, foundDataSources)}))

        KeyEvent.onKeyUpListener(keyCode => {
            if (keyCode === 23 && this.state.highlightedComponent) {
                this.state.highlightedComponent.click()
                this.setState({highlightedComponent: null})
            }
        })
    }
    initNow(apiToken, dataSources = ['terSncf', 'inMemory', 'liveMap']) {
        this.setState({firstScrollY: 3, secondScrollY: 3, apiToken, dataSources, dataSourceByFeature:core.minimalMappingFor(dataSources)})
        setInterval(this.autoScroll, 3000)
        setInterval(this.refreshScreen, 500)
        return this.updateLocation()
    }
    autoScroll() {
        const fromTop = 3
        const delta = (this.state.row1Height || 60) * 0.3 + 0.25
        const maybeNextScrollY1 = this.state.firstScrollY + delta
        const maybeNextScrollY2 = this.state.secondScrollY + delta
        this.setState({
            ...this.state,
            firstScrollY: maybeNextScrollY1 >= this.state.stopsListOfRow1Height ? fromTop : maybeNextScrollY1,
            secondScrollY: maybeNextScrollY2 >= this.state.stopsListOfRow2Height ? fromTop : maybeNextScrollY2
        })
    }
    refreshScreen() {
        if (moment().second() === 2 && !this.state.displayNowColon) {
            this.updateTimetable()
        }
        this.setState({displayNowColon: !this.state.displayNowColon})
    }
    updateTimetable({geo, progressBar, closeLocationPrompt} = {geo: this.state.geo, progressBar: false, closeLocationPrompt: false}) {
        this.setState({geo, currentlyUpdating:progressBar ? true : this.state.currentlyUpdating, 
            displayLocationPrompt: closeLocationPrompt ? false : this.state.displayLocationPrompt})
        const notify = progressBar ? this.setState.bind(this) : () => {}
        return core.nextDepartures(geo, {token: this.state.apiToken, notify, dataSourceByFeature:this.state.dataSourceByFeature})
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
    measureView(event, rowName) {
        this.setState({...this.state, [`${rowName}Height`]: event.nativeEvent.layout.height, [`${rowName}Width`]: event.nativeEvent.layout.width})
    }
    componentDidUpdate() {
        if (this.stopsListOfRow1 && this.stopsListOfRow1.scrollTo) {
            this.stopsListOfRow1.scrollTo({x: 0, y: this.state.firstScrollY, animated: true})
        }
        if (this.stopsListOfRow2 && this.stopsListOfRow2.scrollTo) {
            this.stopsListOfRow2.scrollTo({x: 0, y: this.state.secondScrollY, animated: true})
        }
    }
    validateToken(newValue) {
        core.testToken(newValue)
            .then(() => AsyncStorage.setItem('@store:apiToken', newValue))
            .then(() => this.setState({apiToken: newValue}))
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
        const newDataSourceHasDepartures = metadata[dataSource].features.includes('departures')
        const dataSources =
            newDataSourceHasDepartures && isItAnAddOperation ?
                this.state.dataSources.filter(oneDataSource => !metadata[oneDataSource].features.includes('departures'))
                                      .concat([dataSource]):
            isItAnAddOperation ?
                this.state.dataSources.concat([dataSource]) :
            /*in case of removal*/
                this.state.dataSources.filter(dataSource1 => dataSource1 !== dataSource)
        const minimalMapping = core.minimalMappingFor(dataSources)
        return AsyncStorage.setItem('@store:dataSources', JSON.stringify(dataSources)).then(() =>
            this.setState({dataSources, dataSourceByFeature: minimalMapping}))
    }
    updateHightlightedComponent(component) {
        this.setState({highlightedComponent:component})
    }
    render() {
        return (<Timetable suggestStations={core.suggestStations}
                           displayLocationPrompt={this.state.displayLocationPrompt}
                           rowHeight={this.state.row1Height || 60} rowWidth={320}
                           timetable={this.state.timetable} parent={this}
                           displayNowColon={this.state.displayNowColon}
                           updateHightlightedComponent={this.updateHightlightedComponent}/>)
    }
}
