import PropTypes from 'prop-types'
import {Constants} from 'expo'
import React from 'react'
import {Button, Modal, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, View} from 'react-native'

export default class Settings extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
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
        return (
            <Modal isOpen={this.props.settingsOpened === true} visible={this.props.settingsOpened === true} onRequestClose={this.props.closeSettings} position={'center'} animationType={'slide'} contentLabel='Settings'>
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
                        <View style={oneSettingNoBottomRow}><View style={settingTitle}><Text style={settingName}>garesSncf</Text><Text style={settingDescription}>Quais (grandes gares)</Text></View><Switch style={smallInput} id="garesSncf" label="garesSncf" value={this.props.dataSources.includes('garesSncf')} onValueChange={(value) => this.props.onDataSourceListChange('garesSncf', value)}/><View style={ratings}><View style={oneRating}><Text style={ratingText}>Pertinence★★★☆☆</Text></View><View style={oneRating}><Text style={ratingText}>Fiabilité★★★★☆</Text></View><View style={oneRating}><Text style={ratingText}>Perennité★★☆☆☆</Text></View></View></View>
                        <View style={oneSettingNoBottomRow}><View style={settingTitle}><Text style={settingName}>horairesInfoTrafic</Text><Text style={settingDescription}>Départs (grandes gares)</Text></View><Switch style={smallInput} id="horairesInfoTrafic" label="horairesInfoTrafic" value={this.props.dataSources.includes('horairesInfoTrafic')} onValueChange={(value) => this.props.onDataSourceListChange('horairesInfoTrafic', value)}/><View style={ratings}><View style={oneRating}><Text style={ratingText}>Pertinence★★★☆☆</Text></View><View style={oneRating}><Text style={ratingText}>Fiabilité★★★★☆</Text></View><View style={oneRating}><Text style={ratingText}>Perennité★☆☆☆☆</Text></View></View></View>
                        <View style={oneSettingNoBottomRow}><View style={settingTitle}><Text style={settingName}>inMemory</Text><Text style={settingDescription}>Gares, Couleurs et codes</Text></View><Switch style={smallInput} id="inMemory" label="inMemory" value={this.props.dataSources.includes('inMemory')} onValueChange={(value) => this.props.onDataSourceListChange('inMemory', value)}/><View style={ratings}><View style={oneRating}><Text style={ratingText}>Pertinence★★★☆☆</Text></View><View style={oneRating}><Text style={ratingText}>Fiabilité★★★★★</Text></View><View style={oneRating}><Text style={ratingText}>Perennité★★★★★</Text></View></View></View>
                        <View style={oneSettingNoBottomRow}><View style={settingTitle}><Text style={settingName}>liveMap</Text><Text style={settingDescription}>Géolocalisation</Text></View><Switch style={smallInput} id="liveMap" label="liveMap" value={this.props.dataSources.includes('liveMap')} onValueChange={(value) =>this.props.onDataSourceListChange('liveMap', value)}/><View style={ratings}><View style={oneRating}><Text style={ratingText}>Pertinence★★★★☆</Text></View><View style={oneRating}><Text style={ratingText}>Fiabilité★☆☆☆☆</Text></View><View style={oneRating}><Text style={ratingText}>Perennité★★☆☆☆</Text></View></View></View>
                        <View style={oneSettingNoBottomRow}><View style={settingTitle}><Text style={settingName}>raildar</Text><Text style={settingDescription}>Gares + Départs + Dessertes + Géolocalisation (grandes gares)</Text></View><Switch style={smallInput} id="raildar" label="raildar" value={this.props.dataSources.includes('raildar')} onValueChange={(value) => this.props.onDataSourceListChange('raildar', value)}/><View style={ratings}><View style={oneRating}><Text style={ratingText}>Pertinence★★☆☆☆</Text></View><View style={oneRating}><Text style={ratingText}>Fiabilité★★★★☆</Text></View><View style={oneRating}><Text style={ratingText}>Perennité★★★★☆</Text></View></View></View>
                        <View style={oneSettingNoBottomRow}><View style={settingTitle}><Text style={settingName}>sncf api</Text><Text style={settingDescription}>Gares + Départs + Dessertes</Text></View><Switch style={smallInput} id="sncfApi" label="sncfApi" value={this.props.dataSources.includes('sncfApi')} onValueChange={(value) => this.props.onDataSourceListChange('sncfApi', value)}/><View style={ratings}><View style={oneRating}><Text style={ratingText}>Pertinence★★★☆☆</Text></View><View style={oneRating}><Text style={ratingText}>Fiabilité★★★★★</Text></View><View style={oneRating}><Text style={ratingText}>Perennité★★★★☆</Text></View></View></View>
                        <View style={oneSetting}><View style={settingTitle}><Text style={settingName}>ter sncf</Text><Text style={settingDescription}>Gares + Départs + Quais + Dessertes</Text></View><Switch style={smallInput} id="terSncf" label="terSncf" value={this.props.dataSources.includes('terSncf')} onValueChange={(value) => this.props.onDataSourceListChange('terSncf', value)}/><View style={ratings}><View style={oneRating}><Text style={ratingText}>Pertinence★★★★★</Text></View><View style={oneRating}><Text style={ratingText}>Fiabilité★★☆☆☆</Text></View><View style={oneRating}><Text style={ratingText}>Perennité★☆☆☆☆</Text></View></View></View>
                        <Text style={titleInGreen}>Autorisation pour api sncf</Text>
                        <View style={oneSetting}><View style={settingTitle}><Text style={settingDescription}>Si le token est valide, l'accès à la source 'sncf api' est possible</Text></View><TextInput style={freeField} id="token" label="token" value={this.props.token}/></View>
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
    onDataSourceListChange:PropTypes.func
}