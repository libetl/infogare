import React from 'react'
import {AsyncStorage, PixelRatio} from 'react-native'
import webservice from './src/core/webservice'
import somePlaces from './src/core/somePlaces'
import SignUp from './src/components/signup'
import Timetable from './src/components/timetable'

console.disableYellowBox = true
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...props,
            geo: somePlaces.parisGareDeLyon,
            timetable: {
                departures: new Array(10).fill({}), station: 'chargement...',
                firstScrollY: 3, secondScrollY: 3, stopsListOfRow1Height: 0, stopsListOfRow2Height: 0,
                displayNowColon:true, apiToken: undefined
            }
        }
        this.stopsListOfRow1 = {}
        this.stopsListOfRow2 = {}
        this.autoScroll = this.autoScroll.bind(this)
        this.updateNowTime = this.updateNowTime.bind(this)
        this.updateTimetable = this.updateTimetable.bind(this)
        this.updateLocation = this.updateLocation.bind(this)
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
        }).catch((e) => this.setState({...this.state, apiToken: null}))
    }
    initNow(apiToken) {
        this.setState({...this.state, apiToken})
        navigator.geolocation.getCurrentPosition((position) => {
                this.setState({...this.state,
                    geo:{long: position.coords.longitude, lat: position.coords.latitude}})
                webservice.nextDepartures(this.state.geo, this.state.apiToken, this.setState.bind(this))
                    .then((timetable) => this.setState({...this.state, timetable,
                        firstScrollY: 3, secondScrollY: 3,
                        stopsListOfRow1Height: 0, stopsListOfRow2Height: 0,
                        displayNowColon:true}))
        //            .then(() => setInterval(this.autoScroll, 3000))
        //            .then(() => setInterval(this.updateTimetable, 54000))
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})
        //setInterval(this.updateNowTime, 500)
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
    updateNowTime() {
        this.setState({...this.state, displayNowColon: !this.state.displayNowColon})
    }
    updateTimetable(geo) {
        webservice.nextDepartures(geo || this.state.geo, this.state.apiToken)
            .then((timetable) => this.setState({...this.state, timetable}))
    }
    updateLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({...this.state,
                geo:{long: position.coords.longitude, lat: position.coords.latitude}})
            webservice.nextDepartures(this.state.geo, this.state.apiToken, this.setState.bind(this))
                .then((timetable) => this.setState({...this.state, timetable}))})
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
            .catch((e) => this.setState({...this.state, loginError:e.message}))
    }
    skip() {
        this.setState({...this.state, apiToken: undefined})
        this.initNow(undefined)
    }
    viewOneDeparture(num) {
        console.log(`selected: ${num}`)
        this.setState({...this.state, departureDetails: this.state.timetable.departures[num]})
    }
    hideDetails() {
        this.setState({...this.state, departureDetails: undefined})
    }
    render() {
        if (this.state.apiToken === null) {
            return (<SignUp validateToken={this.validateToken} skip={this.skip} loginError={this.state.loginError}/>)
        }
        return (<Timetable rowHeight={this.state.row1Height || 60} rowWidth={320} timetable={this.state.timetable}
                           parent={this} displayNowColon={this.state.displayNowColon}/>)
    }
}
