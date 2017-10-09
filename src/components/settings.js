import PropTypes from 'prop-types'
import {Constants} from 'expo'
import React from 'react'
import {Modal, Platform, ScrollView, StyleSheet, Switch, Text, View} from 'react-native'

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
        const smallInput = {
        }
        const ratings = {
            flexDirection: 'column'
        }
        const oneRating = {
            flexDirection: 'row',
            fontSize: 8
        }
        return (
            <Modal isOpen={this.props.settingsOpened === true} visible={this.props.settingsOpened === true} onRequestClose={this.props.closeSettings} position={'center'} animationType={'slide'} contentLabel='Settings'>
                <View style={StyleSheet.create({statusBar: {backgroundColor: '#ddc15d',height: Platform.OS === 'ios' ? Constants.statusBarHeight : 0}}).statusBar} />
                <ScrollView style={{height:'100%', width:'100%'}}>
                    <View style={StyleSheet.create({screen:{backgroundColor:'#f4ecf4',display:'flex',flexDirection:'column',flexWrap:'nowrap',height:'100%',width:'100%'}}).screen}>
                        <Text>Paramètres :</Text>
                        <Text style={titleInGreen}>Petite notice avant tout :</Text>
                        <View style={oneSettingNoBottomRow}><Text>Signification des notes ci-dessous : </Text></View>
                        <View style={oneSettingNoBottomRow}><View style={settingTitle}><Text style={settingName}>Pertinence</Text></View><Text style={settingName}>les données sont elles dignes de confiance ? Peuvent elles être érronées ou obsolètes ?</Text></View>
                        <View style={oneSettingNoBottomRow}><View style={settingTitle}><Text style={settingName}>Fiabilité</Text></View><Text style={settingName}>la source fonctionne t-elle tout le temps ? Peut il y avoir des coupures inopinées ?</Text></View>
                        <View style={oneSetting}><View style={settingTitle}><Text style={settingName}>Perennité</Text></View><Text style={settingName}>le service peut il être supprimé définitivement du jour au lendemain ?</Text></View>
                        <Text style={titleInGreen}>Activer les sources suivantes :</Text>
                        <View style={oneSetting}><View style={settingTitle}><Text style={settingName}>garesSncf</Text><Text style={settingDescription}>Quais (grandes gares)</Text></View><Switch style={smallInput} id="garesSncf" label="garesSncf"/><View style={ratings}><View style={oneRating}><Text>Pertinence★★★☆☆</Text></View><View style={oneRating}><Text>Fiabilité★★★★☆</Text></View><View style={oneRating}><Text>Perennité★★☆☆☆</Text></View></View></View>
                        <View style={oneSetting}><View style={settingTitle}><Text style={settingName}>horairesInfoTrafic</Text><Text style={settingDescription}>Départs (grandes gares)</Text></View><Switch style={smallInput} id="horairesInfoTrafic" label="horairesInfoTrafic"/><View style={ratings}><View style={oneRating}><Text>Pertinence★★★☆☆</Text></View><View style={oneRating}><Text>Fiabilité★★★★☆</Text></View><View style={oneRating}><Text>Perennité★☆☆☆☆</Text></View></View></View>
                        <View style={oneSetting}><View style={settingTitle}><Text style={settingName}>inMemory</Text><Text style={settingDescription}>Gares, Couleurs et codes</Text></View><Switch style={smallInput} id="inMemory" label="inMemory"/><View style={ratings}><View style={oneRating}><Text>Pertinence★★★☆☆</Text></View><View style={oneRating}><Text>Fiabilité★★★★★</Text></View><View style={oneRating}><Text>Perennité★★★★★</Text></View></View></View>
                        <View style={oneSetting}><View style={settingTitle}><Text style={settingName}>liveMap</Text><Text style={settingDescription}>Géolocalisation</Text></View><Switch style={smallInput} id="liveMap" label="liveMap"/><View style={ratings}><View style={oneRating}><Text>Pertinence★★★★☆</Text></View><View style={oneRating}><Text>Fiabilité★☆☆☆☆</Text></View><View style={oneRating}><Text>Perennité★★☆☆☆</Text></View></View></View>
                        <View style={oneSetting}><View style={settingTitle}><Text style={settingName}>raildar</Text><Text style={settingDescription}>Gares + Départs + Dessertes + Géolocalisation (grandes gares)</Text></View><Switch style={smallInput} id="raildar" label="raildar"/><View style={ratings}><View style={oneRating}><Text>Pertinence★★☆☆☆</Text></View><View style={oneRating}><Text>Fiabilité★★★★☆</Text></View><View style={oneRating}><Text>Perennité★★★★☆</Text></View></View></View>
                        <View style={oneSetting}><View style={settingTitle}><Text style={settingName}>sncf api</Text><Text style={settingDescription}>Gares + Départs + Dessertes</Text></View><Switch style={smallInput} id="sncfApi" label="sncfApi"/><View style={ratings}><View style={oneRating}><Text>Pertinence★★★☆☆</Text></View><View style={oneRating}><Text>Fiabilité★★★★★</Text></View><View style={oneRating}><Text>Perennité★★★★☆</Text></View></View></View>
                        <View style={oneSetting}><View style={settingTitle}><Text style={settingName}>ter sncf</Text><Text style={settingDescription}>Gares + Départs + Quais + Dessertes</Text></View><Switch style={smallInput} id="terSncf" label="terSncf"/><View style={ratings}><View style={oneRating}><Text>Pertinence★★★★★</Text></View><View style={oneRating}><Text>Fiabilité★★☆☆☆</Text></View><View style={oneRating}><Text>Perennité★☆☆☆☆</Text></View></View></View>
                    </View>
                </ScrollView>
            </Modal>
        )
    }
}

Settings.propTypes = {
    settingsOpened: PropTypes.bool,
    closeSettings: PropTypes.func
}