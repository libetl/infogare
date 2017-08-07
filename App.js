import React from 'react'
import {AsyncStorage} from 'react-native'
import webservice from './src/core/webservice'
import somePlaces from './src/core/somePlaces'
import SignUp from './src/components/signup'
import Timetable from './src/components/timetable'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...props,
            geo: somePlaces.parisGareDeLyon,
            timetable: {
                departures: [{}, {}, {}, {}, {}, {}, {}], station: 'chargement...',
                firstScrollY: 3, secondScrollY: 3, detailsOfRow1Height: 0, detailsOfRow2Height: 0,
                displayNowColon:true, apiToken: undefined
            }
        }
        this.detailsOfRow1 = {}
        this.detailsOfRow2 = {}
        this.autoScroll = this.autoScroll.bind(this)
        this.updateNowTime = this.updateNowTime.bind(this)
        this.updateTimetable = this.updateTimetable.bind(this)
        this.updateLocation = this.updateLocation.bind(this)
        this.initNow = this.initNow.bind(this)
        this.validateToken = this.validateToken.bind(this)
        this.viewOneDeparture = this.viewOneDeparture.bind(this)
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
                webservice.nextDepartures(this.state.geo, this.state.apiToken)
                    .then((timetable) => this.setState({...this.state, timetable,
                        firstScrollY: 3, secondScrollY: 3,
                        detailsOfRow1Height: 0, detailsOfRow2Height: 0,
                        displayNowColon:true}))
                    .then(() => setInterval(this.autoScroll, 3000))
                    .then(() => setInterval(this.updateTimetable, 54000))},
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})
        setInterval(this.updateNowTime, 500)
    }
    autoScroll() {
        this.setState({
            ...this.state,
            firstScrollY: this.state.detailsOfRow1Height < this.state.firstScrollY + 38 ? 3 : this.state.firstScrollY + 26.75,
            secondScrollY: this.state.detailsOfRow2Height < this.state.secondScrollY + 38 ? 3 : this.state.secondScrollY + 26.75
        })
    }
    updateNowTime() {
        this.setState({
            ...this.state,
            displayNowColon: !this.state.displayNowColon})
    }
    updateTimetable(geo) {
        webservice.nextDepartures(geo || this.state.geo, this.state.apiToken).then((timetable) =>
            this.setState({...this.state, timetable}))
    }
    updateLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({...this.state,
                geo:{long: position.coords.longitude, lat: position.coords.latitude}})
            webservice.nextDepartures(this.state.geo, this.state.apiToken)
                .then((timetable) => this.setState({...this.state, timetable}))})
    }
    measureView(event, rowName) {
        this.setState({
            ...this.state,
            [`${rowName}Height`]: event.nativeEvent.layout.height
        })
    }
    componentDidUpdate() {
        if (this.detailsOfRow1 && this.detailsOfRow1.scrollTo) {
            this.detailsOfRow1.scrollTo({x: 0, y: this.state.firstScrollY, animated: true})
            this.detailsOfRow2.scrollTo({x: 0, y: this.state.secondScrollY, animated: true})
        }
    }
    validateToken(newValue) {
        webservice.test(newValue)
            .then(() => AsyncStorage.setItem('@store:apiToken', newValue))
            .then(() => this.initNow(newValue))
            .catch((e) => this.setState({...this.state, loginError:e.message}))
    }
    viewOneDeparture(num) {
        console.log(`selected: ${num}`)
    }
    render() {
        if (this.state.apiToken === null) {
            return (<SignUp validateToken={this.validateToken} loginError={this.state.loginError}/>)
        }
        return (<Timetable timetable={this.state.timetable} parent={this} displayNowColon={this.state.displayNowColon}/>)
    }
}
