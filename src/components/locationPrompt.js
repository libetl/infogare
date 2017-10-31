import PropTypes from 'prop-types'
import React from 'react'
import {Constants, Modal, Platform, Text, StyleSheet, TextInput, View} from '../wrapper'

export default class LocationPrompt extends React.Component {
    constructor(props) {
        super(props)
        this.state = { ...props, newStationName: '', guessedStations: [] }
        this.handleTextChange = this.handleTextChange.bind(this)
        this.done = this.done.bind(this)
    }
    handleTextChange(newStationName) {
        this.setState({ newStationName, guessedStations: this.state.suggestStations(newStationName) })
    }
    componentWillReceiveProps(newProps) {
        this.setState(newProps)
    }
    done(station) {
        this.state.done({ long: station.geometry.coordinates[0], lat: station.geometry.coordinates[1] })
    }
    render() {
        return (
            <Modal style={{display: this.state.displayLocationPrompt === true ? 'block' : 'none'}} isOpen={this.state.displayLocationPrompt === true} visible={this.state.displayLocationPrompt === true} onRequestClose={this.state.abortChangeLocation} position={'center'} animationType={'slide'} contentLabel='Change location'>
                <View style={StyleSheet.create({statusBar: {backgroundColor: '#ddc15d',height: Platform.OS === 'ios' ? Constants.statusBarHeight : 0}}).statusBar} />
                <View style={StyleSheet.create({screen:{backgroundColor:'#f4ecf4',display:'flex',flexDirection:'column',flexWrap:'nowrap',height:'100%',width:'100%'}}).screen}>
                    <Text>Nom de la gare :</Text>
                    <TextInput value={this.state.newStationName} onChangeText={this.handleTextChange} style={{ width: 200, height: 44, padding: 8 }} />
                    <View style={{ flex: 1, flexDirection: 'column', width: '100%', height: '100%' }}>
                        {(this.state.guessedStations || []).slice(0, 10).map(station =>
                            <Text key={`station${station.recordid}`} onPress={() => this.done(station)}>
                                {station.fields.intitule_gare}</Text>)}
                    </View>
                </View>
            </Modal>
        )
    }
}

LocationPrompt.propTypes = {
    displayLocationPrompt: PropTypes.bool,
    suggestStations: PropTypes.func,
    done: PropTypes.func,
    abortChangeLocation: PropTypes.func
}