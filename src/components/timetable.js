import styles from '../css/app.css'
import Departure from './departure'
import Footer from './footer'
import LocationPrompt from './locationPrompt'
import RoundButton from './roundButton'
import Settings from './settings'
import Details from './details'
import PropTypes from 'prop-types'
import React from 'react'
import {Constants, Platform, RefreshControl, ScrollView, StyleSheet, View} from '../wrapper'

export default class Timetable extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={StyleSheet.create({statusBar: {backgroundColor: '#ddc15d',height: Platform.OS === 'ios' ? Constants.statusBarHeight : 0}}).statusBar} />
                <View style={{zIndex:10, position: 'absolute', right: '0%', bottom: '15%', width:'20%', height:'20%'}}>
                    <RoundButton nbButtons={2} text={Platform.OS === 'ios' || Platform.OS === 'web' || Platform.Version >= 21 ? '⚙' : '¤'}
                                 color='#663399' fontColor='#FFFFFF' onClick={this.props.parent.openSettings}/>
                    <RoundButton nbButtons={2} text='🔍' color='#DB0A5B' fontColor='#FFFFFF' longPressText='↻'
                                 longPressColor='#F9BF3B' longPressFontColor='#FFFFFF' onClick={this.props.parent.askForALocation}
                                 onLongClick={this.props.parent.updateLocation}/>
                </View>
                <LocationPrompt displayLocationPrompt={this.props.displayLocationPrompt} suggestStations={this.props.suggestStations} done={this.props.parent.changeLocation} abortChangeLocation={this.props.parent.abortChangeLocation}/>
                <Settings onDataSourceListChange={this.props.parent.onDataSourceListChange} token={this.props.parent.state.apiToken} dataSources={this.props.parent.state.dataSources||[]} allDataSourcesMetadata={this.props.parent.state.allDataSourcesMetadata||{}} currentMapping={this.props.parent.state.dataSourceByFeature||{}} settingsOpened={this.props.parent.state.settingsOpened} closeSettings={this.props.parent.closeSettings} validateToken={this.props.parent.validateToken}/>
                <Details rowWidth={320} details={this.props.parent.state.departureDetails} onClose={this.props.parent.hideDetails}/>
                <ScrollView style={styles.scrollView} contentContainerStyle={{height: `${this.props.timetable.departures.length * 15}%`}}
                            refreshControl={ <RefreshControl refreshing={this.props.parent.state.currentlyUpdating || false} onRefresh={this.props.parent.updateLocation} /> }>
                {(!this.props.timetable.departures ? new Array(10) : this.props.timetable.departures).map((departure, i) =>
                    <Departure height={`${70.0 / this.props.timetable.departures.length * (i <= 1 ? 2 : 1)}%`} num={i} key={`departure${i}`} detailed={i <= 1}
                               odd={i % 2 === 0} departure={departure} viewOneDeparture={this.props.parent.viewOneDeparture}
                               mustBePadded={!departure.name && this.props.timetable.departures.filter(d => d.mode === 'Bus').length === 0 && this.props.timetable.departures.filter(d => d.name).length !== 0}/>)}
                    <View style={styles.bottomPaddingAfterScrolldown}/>
                </ScrollView>
                <Footer updateHightlightedComponent={this.props.updateHightlightedComponent} station={this.props.timetable.station} openSettings={this.props.parent.openSettings} askForALocation={this.props.parent.askForALocation} updateLocation={this.props.parent.updateLocation}/>
            </View>
        )
    }
}

Timetable.propTypes = {
    timetable: PropTypes.object,
    parent: PropTypes.object,
    displayLocationPrompt: PropTypes.bool,
    updateHightlightedComponent: PropTypes.func
}
