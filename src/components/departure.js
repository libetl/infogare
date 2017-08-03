import React from 'react'
import {Image, ScrollView, Text, View} from 'react-native'
import styles from '../css/app.css'
import PropTypes from 'prop-types'

export default class Departure extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const departure = this.props.departure || {}
        const style = styles[`${this.props.detailed ? 'big' : ''}${this.props.odd ? 'odd' : 'even'}`]
        const mode = (departure.mode || '').toLowerCase()
        const lineColorStyle = {width:30, height: 30,  padding: 5, paddingLeft: 7, fontWeight: 'bold',
            borderStyle: 'solid', borderWidth: 3, borderRadius: mode === 'rer' ? 12 : 3,
            borderColor: `#${departure.color}`, color:`#${departure.color}`}
        return (
            <View style={style}>
                <View style={this.props.detailed ? styles.split : styles.dontsplit}>
                    {mode === 'transilien' ? <Image style={styles.modeIcon} source={require('../images/transilien.png')} /> :
                        mode === 'rer' ? <Image style={styles.modeIcon} source={require('../images/rer.png')} /> :
                        <Text style={styles.mode}>{mode}</Text>}
                    {departure.name && <Text style={lineColorStyle}> {departure.name}</Text>}
                    <Text style={styles.number}>{departure.number}</Text>
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

Departure.propTypes = {
    detailed: PropTypes.bool,
    odd: PropTypes.bool,
    departure: PropTypes.object,
    parent: PropTypes.object
}

