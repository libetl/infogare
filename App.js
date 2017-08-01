import React from 'react'
import {AsyncStorage, Button, Modal, ScrollView, Text, TextInput, View} from 'react-native'
import webservice from './src/core/webservice'
import moment from 'moment'
import styles from './src/css/app.css'

const somePlaces = {
    nice: { lat: 43.7245297, long: 7.2535399 },
    dijon: { lat: 47.3221546, long: 5.0279934 },
    perpignan: { lat: 42.7027824, long: 2.8837703 },
    digoin: { lat: 46.4845325, long: 3.9851439 },
    auber: { lat: 48.8729105, long: 2.3259732 },
    champagneSurSeine: { lat: 48.409371, long: 2.7915463 },
    parisGareDeLyon: {lat: 48.8443038, long: 2.3743773}
}

export class Departure extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const departure = this.props.departure || {}
        const style = styles[`${this.props.detailed ? 'big' : ''}${this.props.odd ? 'odd' : 'even'}`]

        return (
            <View style={style}>
                <View style={this.props.detailed ? styles.split : styles.dontsplit}>
                    <Text style={styles.mode}>{departure.mode}</Text>
                    <Text style={styles.number}>{departure.name}{departure.number}</Text>
                    <Text style={styles.time}>{departure.time}  </Text>
                    <Text style={styles.direction}>{!departure.stops ? departure.direction :
                        departure.stops[departure.stops.length - 1]}</Text>
                    <Text style={departure.platform && departure.platform.length > 0 ?
                        styles.platform : styles.noPlatformYet}>{departure.platform}</Text>
                </View>
                {this.props.detailed &&
                <ScrollView ref={(thisRef) => this.props.parent[`detailsOfRow${this.props.detailsRow}`] = thisRef}
                            contentContainerStyle={styles.stops} style={styles.scroll}>
                    <Text onLayout={(event) => this.props.parent.measureView(event, `detailsOfRow${this.props.detailsRow}`)}>{!departure.stops ? '' :
                        departure.stops.map(stop => (
                            <Text key={stop}><Text style={styles.oneStop}> {stop} </Text>
                                <Text style={styles.yellowBullet}>•</Text></Text>))}</Text></ScrollView>}
            </View>
        )
    }
}

export class Footer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.footer}>
                <Button onPress={this.props.parent.updateLocation} title='↻' color='#841584'
                        accessibilityLabel='Mise à jour localisation'/>
                <Text style={styles.footerFont}>Gare trouvée : {this.props.station}</Text>
                <Text style={styles.now}>
                    <Text style={styles.hoursMinutes}>{
                        this.props.displayNowColon ? moment().format('HH:mm') : moment().format('HH mm') } </Text>
                    <Text style={styles.seconds}>{moment().format('ss')}</Text>
                </Text>
            </View>
        )
    }
}

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...props,
            geo: somePlaces.parisGareDeLyon,
            timetable: {
                departures: [{}, {}, {}, {}, {}, {}, {}], station: 'inconnue',
                firstScrollY: 3, secondScrollY: 3, detailsOfRow1Height: 0, detailsOfRow2Height: 0,
                displayNowColon:true, apiToken: undefined
            }
        }
        this.autoScroll = this.autoScroll.bind(this)
        this.updateNowTime = this.updateNowTime.bind(this)
        this.updateTimetable = this.updateTimetable.bind(this)
        this.updateLocation = this.updateLocation.bind(this)
        this.initNow = this.initNow.bind(this)
        this.validateToken = this.validateToken.bind(this)
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
        if (this.detailsOfRow1) {
            this.detailsOfRow1.scrollTo({x: 0, y: this.state.firstScrollY, animated: true})
            this.detailsOfRow2.scrollTo({x: 0, y: this.state.secondScrollY, animated: true})
        }
    }
    validateToken() {
        webservice.test(this.state.savedToken)
            .then(() => AsyncStorage.setItem('@store:apiToken', this.state.savedToken))
            .then(() => this.initNow(this.state.savedToken))
            .catch((e) => {})
    }
    render() {
        if (this.state.apiToken === null) {
            return (
                <Modal animationType='slide' isOpen={true} visible={true} onRequestClose={() => {}} contentLabel='Salut'>
                    <View>
                        <Text>Vous n'êtes pas encore connecté à l'api SNCF</Text>
                        <Text> </Text>
                        <Text>C'est gratuit !</Text>
                        <Text>Rendez vous sur http://data.sncf.com/api</Text>
                        <Text>Puis revenez ici avec votre token</Text>
                        <Text>Remplissez la valeur ci-dessous</Text>
                        <Text> </Text>
                        <View><Text>Token :</Text><TextInput onChangeText={(text) => this.setState({...this.state, savedToken: text})}
                                                             id='apiToken' label='token sncf' style={styles.signIn}/></View>
                        <Text> </Text>
                        <Text> </Text>
                    </View>
                    <Button title='ok' onPress={this.validateToken} />
                </Modal>)
        }
        return (
            <View style={styles.container}>
                <View style={styles.statusbar} />
                <Departure detailed={true} odd={true} departure={this.state.timetable.departures[0]} detailsRow={1} parent={this} />
                <Departure detailed={true} odd={false} departure={this.state.timetable.departures[1]} detailsRow={2} parent={this} />
                <Departure detailed={false} odd={true} departure={this.state.timetable.departures[2]} parent={this} />
                <Departure detailed={false} odd={false} departure={this.state.timetable.departures[3]} parent={this} />
                <Departure detailed={false} odd={true} departure={this.state.timetable.departures[4]} parent={this} />
                <Departure detailed={false} odd={false} departure={this.state.timetable.departures[5]} parent={this} />
                <Departure detailed={false} odd={true} departure={this.state.timetable.departures[6]} parent={this} />
                <Footer station={this.state.timetable.station} displayNowColon={this.state.displayNowColon} parent={this} />
            </View>
        )
    }
}
