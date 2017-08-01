import React from 'react'
import {ScrollView, Text, View} from 'react-native'
import styles from '../css/app.css'
import PropTypes from 'prop-types'

export default class Departure extends React.Component {
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

Departure.propTypes = {
    detailed: PropTypes.bool,
    odd: PropTypes.bool,
    departure: PropTypes.object,
    parent: PropTypes.object
}

