import PropTypes from 'prop-types'
import React from 'react'
import {Button, Constants, Modal, Platform, ScrollView, Switch, Text, TextInput, View} from '../wrapper'

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
const freeField = {minWidth: 120}
const ratingText = {
    fontSize: 12,
    color: '#000'
}
const featuresTranslations = {
    platforms: '🚉',
    departures: '⌚',
    stations: '📖',
    colors: '🎨',
    codes: '🔗',
    journeys: '🛤',
    geolocation: '🗺'
}

export default class Settings extends React.Component {
    constructor(props) {
        super(props)
        this.validateToken = this.validateToken.bind(this)
    }
    validateToken({type, newValue}) {
        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(newValue)) {
            this.props.validateToken({type, newValue})
        }
    }
    render() {
        return (
            <Modal style={{overflowY: 'auto', zIndex: 2, display: this.props.settingsOpened === true ? 'block' : 'none'}} animationType='slide' isOpen={this.props.settingsOpened === true} visible={this.props.settingsOpened === true} onRequestClose={this.props.closeSettings} position={'center'} contentLabel='Settings'>
                <View style={{backgroundColor: '#ddc15d',height: Platform.OS === 'ios' ? Constants.statusBarHeight : 0}} />
                <ScrollView style={{height:'100%', width:'100%'}}>
                    <View style={{backgroundColor:'#f4ecf4', display:'flex',flexDirection:'column',flexWrap:'nowrap',height:'100%',width:'100%'}}>
                        <View style={{width:'100%',backgroundColor:'#6d612d',flexDirection:'row', minHeight: 30, padding: 10}}><Button onPress={this.props.closeSettings} color='#ddc15d' title='◀'/><Text style={{color:'#FFFFFF', fontWeight: 'bold', fontSize: 15, width:'100%', padding:10}}>Paramètres</Text></View>
                        <Text style={titleInGreen}>Petite notice avant tout :</Text>
                        <View style={oneSettingNoBottomRow}><Text>Signification des notes ci-dessous : </Text></View>
                        <View style={oneSettingNoBottomRow}><View style={settingTitle}><Text style={settingName}>🎯 Pertinence</Text></View><Text style={settingName}>les données sont elles dignes de confiance ? Peuvent elles être érronées ou obsolètes ?</Text></View>
                        <View style={oneSettingNoBottomRow}><View style={settingTitle}><Text style={settingName}>🌉 Fiabilité</Text></View><Text style={settingName}>la source fonctionne t-elle tout le temps ? Peut il y avoir des coupures inopinées ?</Text></View>
                        <View style={oneSettingNoBottomRow}><View style={settingTitle}><Text style={settingName}>🆕 Perennité</Text></View><Text style={settingName}>le service peut il être supprimé définitivement du jour au lendemain ?</Text></View>
                        <View style={oneSettingNoBottomRow}><View style={settingTitle}><Text style={settingName}>🚀 Rapidité</Text></View><Text style={settingName}>le service répond il avec efficacité et en temps raisonnable ?</Text></View>
                        <View style={oneSetting}><View><Text>Attention : les sources 'sncfApi' et 'navitiaIo' nécessitent d'être enregistré (https://www.digital.sncf.com/startup/api/token-developpeur, https://www.navitia.io/register)</Text></View></View>
                        <View style={oneSetting}><View><Text style={{color: 'black'}}>Légende : quai=🚉, départs=⌚, gares=📖, couleurs=🎨, codes=🔗, dessertes=🛤, géolocalisation=🗺</Text></View></View>
                        <Text style={titleInGreen}>Activer la source suivante :</Text>
                        <View style={{flexDirection: 'row', width: '100%', flexWrap: 'wrap'}}>
                            {Object.entries(this.props.allDataSourcesMetadata||{}).map(([name, metadata]) =>
                                <View key={name} style={{flexDirection: 'column', minWidth: 160, minHeight: 180, padding: 20}}>
                                    <Text style={{color: 'black'}}>{name}</Text>
                                    <Switch id={name} label={name} value={this.props.dataSources.includes(name)} onValueChange={(value) => this.props.onDataSourceListChange(name, value)}/>
                                    <View>
                                        <View>
                                            <Text style={ratingText}>🎯{new Array(metadata.ratings.relevancy).fill('🌟')}{new Array(5 - metadata.ratings.relevancy).fill('☆')}</Text>
                                        </View>
                                        <View>
                                            <Text style={ratingText}>🌉{new Array(metadata.ratings.reliability).fill('🌟')}{new Array(5 - metadata.ratings.reliability).fill('☆')}</Text>
                                        </View>
                                        <View>
                                            <Text style={ratingText}>🆕{new Array(metadata.ratings.sustainability).fill('🌟')}{new Array(5 - metadata.ratings.sustainability).fill('☆')}</Text>
                                        </View>
                                        <View>
                                            <Text style={ratingText}>🚀{new Array(metadata.ratings.efficiency).fill('🌟')}{new Array(5 - metadata.ratings.efficiency).fill('☆')}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'column'}}>
                                        <Text style={{color: 'black'}}>{metadata.features.map((feature) => featuresTranslations[feature])}</Text>
                                        <Text style={{color: 'red'}}>
                                            {metadata.everywhere ? '' : '⚠️ certaines gares'}
                                        </Text>
                                        <Text style={{color: 'black'}}>
                                            {metadata.butSpecificForRegion ? `🌎 ${metadata.butSpecificForRegion}` : ''}
                                        </Text>
                                        <Text style={{color: 'black'}}>
                                            {metadata.needsAuthentication ? `🔒 ${metadata.needsAuthentication}` : ''}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </View>
                        <Text style={titleInGreen}>Autorisation pour api sncf</Text>
                        <View style={oneSettingNoBottomRow}><Text>Si le token est valide, l'accès à la source 'sncfApi' devient possible</Text></View>
                        <View style={oneSetting}><View style={settingTitle}><Text style={settingName}>token</Text></View><TextInput style={freeField} id='apiToken' label='token' onChangeText={newValue => this.validateToken({type: 'apiToken', newValue})} defaultValue={this.props.apiToken}/></View>
                        <Text style={titleInGreen}>Autorisation pour navitiaIo</Text>
                        <View style={oneSettingNoBottomRow}><Text>Si le token est valide, l'accès à la source 'navitiaIo' devient possible</Text></View>
                        <View style={oneSetting}><View style={settingTitle}><Text style={settingName}>token</Text></View><TextInput style={freeField} id='navitiaToken' label='token' onChangeText={newValue => this.validateToken({type: 'navitiaToken', newValue})} defaultValue={this.props.navitiaToken}/></View>
                    </View>
                </ScrollView>
            </Modal>
        )
    }
}

Settings.propTypes = {
    allDataSourcesMetadata: PropTypes.object,
    settingsOpened: PropTypes.bool,
    closeSettings: PropTypes.func,
    dataSources: PropTypes.array,
    currentMapping: PropTypes.object,
    apiToken: PropTypes.string,
    navitiaToken: PropTypes.string,
    onDataSourceListChange:PropTypes.func,
    validateToken:PropTypes.func
}