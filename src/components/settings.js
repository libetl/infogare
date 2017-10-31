import PropTypes from 'prop-types'
import React from 'react'
import webservice from '../core/webservice'
import {Constants, Button, Modal, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, View} from '../wrapper'

const titleInGreen = {
    color: '#009586',
    fontWeight: 'bold',
    margin: 10
}
const oneSetting = {
    width:'100%',
    display: 'flex',
    flex:1,
    flexDirection: 'row',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    alignItems: 'center'
}
const oneSettingNoBottomRow = {
    width:'100%',
    display: 'flex',
    flex:1,
    flexDirection: 'row',
    alignItems: 'center'
}
const settingTitle = {
    width: '30%',
    margin: 20
}
const settingName = {
    color: '#000',
    fontSize: 15,
    flex: 1,
    flexDirection: 'column'
}
const settingDescription = {
    width: '100%'
}
const smallInput = {}
const freeField = {minWidth: 120}
const ratings = {
    flexDirection: 'column'
}
const oneRating = {
    alignSelf: 'flex-end',
    flexDirection: 'row'
}
const ratingText = {
    fontSize: 12
}
const featuresTranslations = {
    platforms: 'quais',
    departures: 'départs',
    stations: 'gares',
    colors: 'couleurs',
    codes: 'codes',
    journeys: 'dessertes',
    geolocation: 'géolocalisation'
}

export default class Settings extends React.Component {
    constructor(props) {
        super(props)
        this.testToken = this.testToken.bind(this)
    }
    testToken(value) {
        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) {
            this.props.validateToken(value)
        }
    }
    render() {
        return (
            <Modal style={{display: this.props.settingsOpened === true ? 'block' : 'none'}} animationType='slide' isOpen={this.props.settingsOpened === true} visible={this.props.settingsOpened === true} onRequestClose={this.props.closeSettings} position={'center'} contentLabel='Settings'>
                <View style={StyleSheet.create({statusBar: {backgroundColor: '#ddc15d',height: Platform.OS === 'ios' ? Constants.statusBarHeight : 0}}).statusBar} />
                <ScrollView style={{height:'100%', width:'100%'}}>
                    <View style={StyleSheet.create({screen:{backgroundColor:'#f4ecf4',display:'flex',flexDirection:'column',flexWrap:'nowrap',height:'100%',width:'100%'}}).screen}>
                        <View style={{width:'100%',backgroundColor:'#6d612d',flexDirection:'row', minHeight: 30, padding: 10}}><Button onPress={this.props.closeSettings} color='#ddc15d' title="◀"/><Text style={{color:'#FFFFFF', fontWeight: 'bold', fontSize: 15, width:'100%', padding:10}}>Paramètres</Text></View>
                        <Text style={titleInGreen}>Petite notice avant tout :</Text>
                        <View style={oneSettingNoBottomRow}><Text>Signification des notes ci-dessous : </Text></View>
                        <View style={oneSettingNoBottomRow}><View style={settingTitle}><Text style={settingName}>Pertinence</Text></View><Text style={settingName}>les données sont elles dignes de confiance ? Peuvent elles être érronées ou obsolètes ?</Text></View>
                        <View style={oneSettingNoBottomRow}><View style={settingTitle}><Text style={settingName}>Fiabilité</Text></View><Text style={settingName}>la source fonctionne t-elle tout le temps ? Peut il y avoir des coupures inopinées ?</Text></View>
                        <View style={oneSettingNoBottomRow}><View style={settingTitle}><Text style={settingName}>Perennité</Text></View><Text style={settingName}>le service peut il être supprimé définitivement du jour au lendemain ?</Text></View>
                        <View style={oneSetting}><View><Text>Attention : la source 'sncf api' nécessite d'être enregistré sur http://data.sncf.com/api</Text></View></View>
                        <Text style={titleInGreen}>Activer les sources suivantes :</Text>
                        {Object.entries(webservice.dataSources).map(([name, metadata]) =>
                            <View key={name} style={oneSettingNoBottomRow}><View style={settingTitle}><Text style={settingName}>{name}</Text><Text style={settingDescription}>{metadata.features.map(feature => featuresTranslations[feature]).join('+\n')}{metadata.everywhere ? '' : ' (grandes gares)'}{metadata.butSpecificForRegion ? `(disponible uniquement pour la région ${metadata.butSpecificForRegion})` : ''}</Text></View><Switch style={smallInput} id={name} label={name} value={this.props.dataSources.includes(name)} onValueChange={(value) => this.props.onDataSourceListChange(name, value)}/><View style={ratings}><View style={oneRating}><Text style={ratingText}>Pertinence{new Array(metadata.ratings.relevancy).fill('★')}{new Array(5 - metadata.ratings.relevancy).fill('☆')}</Text></View><View style={oneRating}><Text style={ratingText}>Fiabilité{new Array(metadata.ratings.reliability).fill('★')}{new Array(5 - metadata.ratings.reliability).fill('☆')}</Text></View><View style={oneRating}><Text style={ratingText}>Perennité{new Array(metadata.ratings.sustainability).fill('★')}{new Array(5 - metadata.ratings.sustainability).fill('☆')}</Text></View></View></View>
                        )}
                        <Text style={titleInGreen}>Autorisation pour api sncf</Text>
                        <View style={oneSettingNoBottomRow}><Text>Si le token est valide, l'accès à la source 'sncf api' devient possible</Text></View>
                        <View style={oneSetting}><View style={settingTitle}><Text style={settingName}>token</Text></View><TextInput style={freeField} id="token" label="token" onChangeText={value => this.testToken(value)} defaultValue={this.props.token}/></View>
                    </View>
                </ScrollView>
            </Modal>
        )
    }
}

Settings.propTypes = {
    settingsOpened: PropTypes.bool,
    closeSettings: PropTypes.func,
    dataSources: PropTypes.array,
    token: PropTypes.string,
    onDataSourceListChange:PropTypes.func,
    validateToken:PropTypes.func
}