import styles from '../css/app.css'
import Departure from '../components/departure'
import Footer from '../components/footer'
import React from 'react'
import {ScrollView, Text, View} from 'react-native'
import PropTypes from 'prop-types'

export default class Timetable extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.statusbar}/>
                <ScrollView style={styles.scrollView} contentContainerStyle={{height: `${this.props.timetable.departures.length * 15}%`}}>
                {(!this.props.timetable.departures ? new Array(10) : this.props.timetable.departures).map((departure, i) =>
                    <Departure rows={this.props.timetable.departures.length} num={i} key={`departure${i}`} detailed={i <= 1}
                               odd={i % 2 === 0} departure={departure} detailsRow={i <= 1 ? i + 1 : undefined} parent={this.props.parent}
                               rowHeight={this.props.rowHeight} rowWidth={this.props.rowWidth}/>)}
                    <View style={styles.bottomPaddingAfterScrolldown}/>
                </ScrollView>
                <Footer station={this.props.timetable.station} displayNowColon={this.props.displayNowColon} updateLocation={this.props.parent.updateLocation}/>
            </View>
        )
    }
}

Timetable.propTypes = {
    rowWidth: PropTypes.number,
    rowHeight: PropTypes.number,
    timetable: PropTypes.object,
    parent: PropTypes.object,
    displayNowColon: PropTypes.bool
}
