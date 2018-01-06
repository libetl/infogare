import PropTypes from 'prop-types'
import React from 'react'
import {Constants, Modal, Platform, ScrollView, Text, TextInput, View} from '../wrapper'

export default class LocationPrompt extends React.Component {
    constructor(props) {
        super(props)
        this.state = { ...props, newStationName: '', guessedStations: []}
        this.handleTextChange = this.handleTextChange.bind(this)
        this.done = this.done.bind(this)
    }
    handleTextChange(newStationName) {
        this.setState({ newStationName, guessedStations: this.props.suggestStations(newStationName)})
    }
    componentWillReceiveProps(newProps) {
        this.setState(newProps)
    }
    done(station) {
        const stationData = typeof station === 'string' ?
            this.props.suggestStations(station).filter(x => x.name === station)[0] : station
        this.state.done({ long: stationData.coordinates[0], lat: stationData.coordinates[1] })
    }
    render() {
        return (
            <Modal style={{display: this.state.displayLocationPrompt === true ? 'block' : 'none', width: '100%'}} isOpen={this.state.displayLocationPrompt === true} visible={this.state.displayLocationPrompt === true} onRequestClose={this.state.abortChangeLocation} position={'center'} animationType={'slide'} contentLabel='Change location'>
                <View style={{backgroundColor: '#ddc15d', height: Platform.OS === 'ios' ? Constants.statusBarHeight : 0}} />
                <View style={{backgroundColor:'#f4ecf4',display:'flex',flexDirection:'row', height:'100%', width:'100%'}}>
                    <View style={{ flex: 1, flexDirection: 'column', width: '50%', height: '100%' }}>
                        <Text>Nom de la gare :</Text>
                        <TextInput value={this.state.newStationName} onChangeText={this.handleTextChange} style={{ width:'100%', height: 44, padding: 8 }} />
                        {(this.state.guessedStations || []).slice(0, 10).map(station =>
                            <View key={`station${station.tvs}`} style={{flexDirection: 'row'}}>
                                <Text style={{fontSize: 20}}
                                      onPress={() => this.props.toggleFavorite(station.name)}>{
                                    this.state.favoriteStations.includes(station.name) ? '🌟' : '☆'
                                }</Text>
                                <Text style={{paddingTop: 6}} onPress={() => this.done(station)}>{station.name}</Text></View>)}
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', width: '50%', height: '100%' }}>
                        <Text>Favoris :</Text>
                        <ScrollView>
                            {!this.state.favoriteStations.length ?
                                <Text style={{fontWeight: 'thin', fontStyle: 'italic'}}>Pas de favori</Text> :
                                this.state.favoriteStations.map(favoriteStation =>
                                    <View key={`favoriteStation${favoriteStation}`} style={{flexDirection: 'row'}}>
                                        <Text onPress={() => this.props.toggleFavorite(favoriteStation)}>🌟</Text>
                                        <Text onPress={() => this.done(favoriteStation)}>{favoriteStation}</Text>
                                    </View>)}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        )
    }
}

LocationPrompt.propTypes = {
    favoriteStations: PropTypes.array,
    displayLocationPrompt: PropTypes.bool,
    suggestStations: PropTypes.func,
    done: PropTypes.func,
    abortChangeLocation: PropTypes.func
}