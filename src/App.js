import React from 'react'
import moment from 'moment'
import webservice from './core/webservice'
import Timetable from './components/timetable'
import {AsyncStorage} from './wrapper'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...props, settingsOpened: false,
            dataSources: [],
            allDataSourcesMetadata: webservice.dataSources,
            geo: {lat:48.880185,long:2.355151},
            dataSourceByFeature: {},
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
        this.validateToken = this.validateToken.bind(this)
        this.viewOneDeparture = this.viewOneDeparture.bind(this)
        this.hideDetails = this.hideDetails.bind(this)
        this.openSettings = this.openSettings.bind(this)
        this.closeSettings = this.closeSettings.bind(this)
        this.onDataSourceListChange = this.onDataSourceListChange.bind(this)
    }
    componentDidMount() {
        AsyncStorage.getItem('@store:apiToken').then(apiToken =>
            AsyncStorage.getItem('@store:dataSources').then(dataSources => {
                let foundDataSources
                try{foundDataSources = JSON.parse(dataSources) || undefined}catch(e){}
                this.initNow(apiToken, foundDataSources)}))
    }
    initNow(apiToken, dataSources = ['terSncf', 'inMemory', 'liveMap']) {
        this.setState({apiToken, dataSources, dataSourceByFeature:webservice.minimalMappingFor(dataSources)})
        navigator.geolocation.getCurrentPosition(position => {
                this.setState({geo:{long: position.coords.longitude, lat: position.coords.latitude}})
                webservice.nextDepartures(this.state.geo,
                    {token: this.state.apiToken, notify: this.setState.bind(this), dataSourceByFeature:this.state.dataSourceByFeature})
                    .then((timetable) => this.setState({timetable,
                        firstScrollY: 3, secondScrollY: 3,
                        displayNowColon:true}))
                    .then(() => setInterval(this.autoScroll, 3000))
            }, () => {}, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})
        setInterval(this.refreshScreen, 500)
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
    updateTimetable(geo) {
        return webservice.nextDepartures(geo || this.state.geo, {token: this.state.apiToken, dataSourceByFeature:this.state.dataSourceByFeature})
            .then((timetable) => this.setState({timetable}))
    }
    askForALocation() {
        this.setState({displayLocationPrompt: !this.state.displayLocationPrompt})
    }
    abortChangeLocation() {
        this.setState({displayLocationPrompt: false})
    }
    changeLocation(geo) {
        this.setState({geo, displayLocationPrompt: false, currentlyUpdating:true})
        webservice.nextDepartures(geo, {token: this.state.apiToken, notify:this.setState.bind(this), dataSourceByFeature:this.state.dataSourceByFeature})
            .then((timetable) => this.setState({currentlyUpdating:false, timetable}))
    }
    updateLocation() {
        this.setState({currentlyUpdating:true})
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({geo:{long: position.coords.longitude, lat: position.coords.latitude}})
            webservice.nextDepartures(this.state.geo, {token: this.state.apiToken, notify:this.setState.bind(this), dataSourceByFeature:this.state.dataSourceByFeature})
                .then((timetable) => this.setState({currentlyUpdating:false, timetable}))})
    }
    measureView(event, rowName) {
        this.setState({...this.state,
            [`${rowName}Height`]: event.nativeEvent.layout.height, [`${rowName}Width`]: event.nativeEvent.layout.width})
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
        webservice.test(newValue)
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
    onDataSourceListChange(dataSource, added) {
        const dataSources = added ? [...this.state.dataSources, dataSource] :
            this.state.dataSources.filter(dataSource1 => dataSource1 !== dataSource)
        const minimalMapping = webservice.minimalMappingFor(dataSources)
        AsyncStorage.setItem('@store:dataSources', JSON.stringify(dataSources)).then(() =>
            this.setState({dataSources, dataSourceByFeature: minimalMapping}))
    }
    render() {
        return (<Timetable suggestStations={webservice.suggestStations}
                           displayLocationPrompt={this.state.displayLocationPrompt}
                           rowHeight={this.state.row1Height || 60} rowWidth={320}
                           timetable={this.state.timetable} parent={this}
                           displayNowColon={this.state.displayNowColon}/>)
    }
}
