import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import webservice from './src/core/webservice'

const somePlaces = {
    nice: {lat:43.7245297, long:7.2535399},
    dijon: {lat:47.3221546, long:5.0279934},
    perpignan: {lat:42.7027824, long:2.8837703},
    digoin: {lat:46.4845325, long:3.9851439},
    auber: {lat:48.8729105, long:2.3259732},
    champagneSurSeine: {lat:48.409371, long:2.7915463}
}

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {...props, timetable:[]}
    }
    componentDidMount() {
        webservice.nextDepartures(somePlaces.champagneSurSeine).then((timetable) => this.setState({...this.state, timetable}))
    }
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.odd}><Text>{JSON.stringify(this.state.timetable[0])}</Text></View>
          <View style={styles.even}><Text>{JSON.stringify(this.state.timetable[1])}</Text></View>
          <View style={styles.odd}><Text>{JSON.stringify(this.state.timetable[2])}</Text></View>
          <View style={styles.even}><Text>{JSON.stringify(this.state.timetable[3])}</Text></View>
          <View style={styles.odd}><Text>{JSON.stringify(this.state.timetable[4])}</Text></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%',
    width:'100%'
  },
  odd: {
    height:'20%',
    width: '100%',
    backgroundColor:'#0d5da6'
  },
  even: {
    height:'20%',
    width: '100%',
    backgroundColor:'#04396d'
  }
})
