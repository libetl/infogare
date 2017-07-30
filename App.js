import React from 'react'
import { Dimensions, StyleSheet, Text, ScrollView, View } from 'react-native'
import webservice from './src/core/webservice'
import moment from 'moment'

const somePlaces = {
  nice: { long: 43.7245297, lat: 7.2535399 },
  dijon: { long: 47.3221546, lat: 5.0279934 },
  perpignan: { long: 42.7027824, lat: 2.8837703 },
  digoin: { long: 46.4845325, lat: 3.9851439 },
  auber: { long: 48.8729105, lat: 2.3259732 },
  champagneSurSeine: { long: 48.409371, lat: 2.7915463 }
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
          <Text style={styles.direction}>{departure.direction}</Text>
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
      geo: somePlaces.nice,
      timetable: {
        departures: [{}, {}, {}, {}, {}, {}, {}], station: 'inconnue',
        firstScrollY: 3, secondScrollY: 3, detailsOfRow1Height: 0, detailsOfRow2Height: 0,
        displayNowColon:true
      }
    }
    this.autoScroll = this.autoScroll.bind(this)
    this.updateNowTime = this.updateNowTime.bind(this)
    this.updateTimetable = this.updateTimetable.bind(this)
  }
  componentDidMount() {
    webservice.nextDepartures(this.state.geo)
      .then((timetable) => this.setState({
        ...this.state, timetable,
        firstScrollY: 3, secondScrollY: 3,
        detailsOfRow1Height: 0, detailsOfRow2Height: 0,
        displayNowColon:true
      }))
      .then(() => setInterval(this.autoScroll, 3000))
      .then(() => setInterval(this.updateTimetable, 54000))
      setInterval(this.updateNowTime, 500)
  }
  autoScroll() {
    this.setState({
      ...this.state,
      firstScrollY: this.state.detailsOfRow1Height < this.state.firstScrollY + 33 ? 3 : this.state.firstScrollY + 23.5,
      secondScrollY: this.state.detailsOfRow2Height < this.state.secondScrollY + 33 ? 3 : this.state.secondScrollY + 23.5
    })
  }
  updateNowTime() {
    this.setState({
      ...this.state,
      displayNowColon: !this.state.displayNowColon})
  }
  updateTimetable() {
    webservice.nextDepartures(this.state.geo)
      .then((timetable) => this.setState({...this.state, departures}))
  }
  componentDidUpdate() {
    this.detailsOfRow1.scrollTo({ x: 0, y: this.state.firstScrollY, animated: true })
    this.detailsOfRow2.scrollTo({ x: 0, y: this.state.secondScrollY, animated: true })
  }
  measureView(event, rowName) {
    this.setState({
      ...this.state,
      [`${rowName}Height`]: event.nativeEvent.layout.height
    })
  }
  render() {
    const timetable = this.state.timetable
    return (
      <View style={styles.container}>
        <View style={styles.statusbar} />
        <Departure detailed={true} odd={true} departure={timetable.departures[0]} detailsRow={1} parent={this} />
        <Departure detailed={true} odd={false} departure={timetable.departures[1]} detailsRow={2} parent={this} />
        <Departure detailed={false} odd={true} departure={timetable.departures[2]} parent={this} />
        <Departure detailed={false} odd={false} departure={timetable.departures[3]} parent={this} />
        <Departure detailed={false} odd={true} departure={timetable.departures[4]} parent={this} />
        <Departure detailed={false} odd={false} departure={timetable.departures[5]} parent={this} />
        <Departure detailed={false} odd={true} departure={timetable.departures[6]} parent={this} />
        <Footer station={timetable.station} displayNowColon={this.state.displayNowColon}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  bigodd: {
    height: '20%',
    width: '100%',
    backgroundColor: '#0d5da6',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  bigeven: {
    height: '20%',
    width: '100%',
    backgroundColor: '#04396d',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  odd: {
    height: '10%',
    width: '100%',
    backgroundColor: '#0d5da6',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  even: {
    height: '10%',
    width: '100%',
    backgroundColor: '#04396d',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  mode: {
    color: '#fff',
    fontSize: 15,
    width: '10%'
  },
  number: {
    color: '#fff',
    fontSize: 15,
    width: '20%'
  },
  time: {
    color: '#dfc81f',
    fontSize: 15,
    fontWeight: 'bold',
    width: '15%'
  },
  direction: {
    color: '#fff',
    fontSize: 15,
    overflow: 'hidden',
    width: '45%'
  },
  platform: {
    color: '#fff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 6,
    width: '10%',
    height: 25,
    textAlign: 'center'
  },
  noPlatformYet: {
    color: '#fff',
    borderRadius: 6,
    width: '10%',
    height: 25,
    textAlign: 'center'
  },
  split: {
    marginBottom: -25,
    height: '100%',
    width: '100%',
    flexDirection: 'row'
  },
  dontsplit: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  scroll: {
    height: 20
  },
  stops: {
    paddingTop: 0,
    paddingBottom: 0,
    width: '100%',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  oneStop: {
    color: '#fff',
    fontSize: 20
  },
  yellowBullet: {
    color: '#dfc81f'
  },
  footer: {
    backgroundColor: '#2c0A3B',
    width: '100%',
    height: '10%',
    flexDirection: 'row'
  },
  footerFont: {
    color: '#fff',
    flexGrow: 1
  },
  now: {
    backgroundColor: '#04396d',
    width:72,
    height:30,
    marginTop:8,
    paddingLeft:10,
    paddingTop: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 6
  },
  hoursMinutes: {
    color: '#fff'
  },
  seconds: {
    color: '#dfc81f',
    fontSize:10
  },
  statusbar: {
    height: 48
  }
})
