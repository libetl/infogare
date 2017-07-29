import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import webservice from './src/core/webservice'

const somePlaces = {
    nice: {long:43.7245297, lat:7.2535399},
    dijon: {long:47.3221546, lat:5.0279934},
    perpignan: {long:42.7027824, lat:2.8837703},
    digoin: {long:46.4845325, lat:3.9851439},
    auber: {long:48.8729105, lat:2.3259732},
    champagneSurSeine: {long:48.409371, lat:2.7915463}
}

export class Departure extends React.Component {
  constructor(props) {
        super(props)
  }
  render() {
    const departure = this.props.departure || {}
    const style = styles[`${this.props.detailed ? 'big' : ''}${this.props.odd ? 'odd' : 'even'}`]; 
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
          <View style={styles.stops}><Text>{!departure.stops ? '' :
            departure.stops.map(stop => (
              <Text key={stop}><Text style={styles.oneStop}> {stop} </Text>
                <Text style={styles.yellowBullet}>•</Text></Text>))}</Text></View>}
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
      </View>
    )
  }
}

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {...props, timetable:{departures:[{},{},{},{},{},{},{}], station: 'inconnue'}}
    }
    componentDidMount() {
        webservice.nextDepartures(somePlaces.nice).then((timetable) => this.setState({...this.state, timetable}))
    }
  render() {
    const timetable = this.state.timetable
    return (
      <View style={styles.container}>
          <View style={styles.statusbar}/>
          <Departure detailed={true} odd={true} departure={timetable.departures[0]}/>
          <Departure detailed={true} odd={false} departure={timetable.departures[1]}/>
          <Departure detailed={false} odd={true} departure={timetable.departures[2]}/>
          <Departure detailed={false} odd={false}  departure={timetable.departures[3]}/>
          <Departure detailed={false} odd={true} departure={timetable.departures[4]}/>
          <Departure detailed={false} odd={false} departure={timetable.departures[5]}/>
          <Departure detailed={false} odd={true} departure={timetable.departures[6]}/>
          <Footer station={timetable.station}/>
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
    height:'100%',
    width:'100%'
  },
  bigodd: {
    height:'20%',
    width: '100%',
    backgroundColor:'#0d5da6',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  bigeven: {
    height:'20%',
    width: '100%',
    backgroundColor:'#04396d',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  odd: {
    height:'10%',
    width: '100%',
    backgroundColor:'#0d5da6',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  even: {
    height:'10%',
    width: '100%',
    backgroundColor:'#04396d',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  mode: {
    color:'#fff',
    fontSize: 15,
    width:'10%'
  },
  number: {
    color:'#fff',
    fontSize: 15,
    width:'20%'
  },
  time: {
    color:'#dfc81f',
    fontSize: 15,
    fontWeight: 'bold',
    width:'15%'
  },
  direction: {
    color:'#fff',
    fontSize: 15,
    overflow:'hidden',
    width:'45%'
  },
  platform: {
    color:'#fff',
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'#fff',
    borderRadius:6,
    width:'10%',
    height:25,
    textAlign:'center'
  },
  noPlatformYet: {
    color:'#fff',
    borderRadius:6,
    width:'10%',
    height:25,
    textAlign:'center'
  },
  split: {
    flexGrow: 1,
    width:'100%',
    flexDirection: 'row'
  },
  dontsplit: {
    height:'100%',
    width:'100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  stops: {
    height:28,
    width:'100%',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  oneStop: {
    color:'#fff',
    fontSize: 20
  },
  yellowBullet: {
    color:'#dfc81f'
  },
  footer: {
    backgroundColor:'#2c0A3B',
    width: '100%',
    height: '10%'
  },
  footerFont: {
    color:'#fff',
    width: '100%'
  },
  statusbar: {
    height:45
  }
})
