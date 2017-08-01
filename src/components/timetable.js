import styles from '../css/app.css'
import Departure from '../components/departure'
import Footer from '../components/footer'
import React from 'react'
import {View} from 'react-native'
import PropTypes from 'prop-types'

export default class Timetable extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.statusbar}/>
                <Departure detailed={true} odd={true} departure={this.props.timetable.departures[0]} detailsRow={1} parent={this.props.parent}/>
                <Departure detailed={true} odd={false} departure={this.props.timetable.departures[1]} detailsRow={2} parent={this.props.parent}/>
                <Departure detailed={false} odd={true} departure={this.props.timetable.departures[2]} parent={this.props.parent}/>
                <Departure detailed={false} odd={false} departure={this.props.timetable.departures[3]} parent={this.props.parent}/>
                <Departure detailed={false} odd={true} departure={this.props.timetable.departures[4]} parent={this.props.parent}/>
                <Departure detailed={false} odd={false} departure={this.props.timetable.departures[5]} parent={this.props.parent}/>
                <Departure detailed={false} odd={true} departure={this.props.timetable.departures[6]} parent={this.props.parent}/>
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
