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
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.rowsContainer}>
                {[...new Array(15)].map((item, i) =>
                    <Departure key={`departure${i}`} detailed={i <= 1} odd={i % 2 === 0} departure={this.props.timetable.departures[i]} detailsRow={i <= 1 ? i + 1 : undefined} parent={this.props.parent}/>)}
                    <Text style={styles.bottomPaddingAfterScrolldown}>.</Text>
                </ScrollView>
                <Footer station={this.props.timetable.station} displayNowColon={this.props.displayNowColon}
                        updateLocation={this.props.parent.updateLocation}/>
            </View>
        )
    }
}

Timetable.propTypes = {
    timetable: PropTypes.object,
    parent: PropTypes.object,
    displayNowColon: PropTypes.bool
}
