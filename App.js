import React from 'react'
import {AsyncStorage, PixelRatio} from 'react-native'
import moment from 'moment'
import webservice from './src/core/webservice'
import places from './src/core/places'
import SignUp from './src/components/signup'
import Timetable from './src/components/timetable'

console.disableYellowBox = true
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...props,
            geo: places.parisGaredeLyon,
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
        this.skip = this.skip.bind(this)
        this.viewOneDeparture = this.viewOneDeparture.bind(this)
        this.hideDetails = this.hideDetails.bind(this)
    }
    componentDidMount() {
        AsyncStorage.getItem('@store:apiToken').then((apiToken) => {
            if (apiToken === null) {
                throw new Error('Pas connecté à data.sncf.com/api')
            }
            this.initNow(apiToken)
        }).catch((e) => this.setState({apiToken: null}))
    }
    initNow(apiToken) {
        this.setState({apiToken})
        navigator.geolocation.getCurrentPosition((position) => {
                this.setState({geo:{long: position.coords.longitude, lat: position.coords.latitude}})
                webservice.nextDepartures(this.state.geo, this.state.apiToken, this.setState.bind(this))
                    .then((timetable) => this.setState({timetable,
                        firstScrollY: 3, secondScrollY: 3,
                        displayNowColon:true}))
                    .then(() => setInterval(this.autoScroll, 3000))
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})
        setInterval(this.refreshScreen, 500)
    }
    autoScroll() {
        const fromTop = 0
        const delta = Math.ceil((this.state.row1Height || 60) * 0.15 + 4)
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
        return webservice.nextDepartures(geo || this.state.geo, this.state.apiToken)
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
        webservice.nextDepartures(geo, this.state.apiToken, this.setState.bind(this))
            .then((timetable) => this.setState({currentlyUpdating:false, timetable}))
    }
    updateLocation() {
        this.setState({currentlyUpdating:true})
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({geo:{long: position.coords.longitude, lat: position.coords.latitude}})
            webservice.nextDepartures(this.state.geo, this.state.apiToken, this.setState.bind(this))
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
            .then(() => this.initNow(newValue))
            .catch((e) => this.setState({loginError:e.message}))
    }
    skip() {
        this.setState({...this.state, apiToken: undefined})
        this.initNow(undefined)
    }
    viewOneDeparture(num) {
        this.setState({departureDetails: this.state.timetable.departures[num]})
    }
    hideDetails() {
        this.setState({departureDetails: undefined})
    }
    render() {
        if (this.state.apiToken === null) {
            return (<SignUp validateToken={this.validateToken} skip={this.skip} loginError={this.state.loginError}/>)
        }
        return (<Timetable suggestStations={webservice.suggestStations}
                           displayLocationPrompt={this.state.displayLocationPrompt}
                           rowHeight={this.state.row1Height || 60} rowWidth={320}
                           timetable={this.state.timetable} parent={this}
                           displayNowColon={this.state.displayNowColon}/>)
    }
}
