import PropTypes from 'prop-types'
import React from 'react'
import {Button, Modal, ScrollView, Text, View} from '../wrapper'

const titleInGreen = {
    color: '#009586',
    fontWeight: 'bold',
    margin: 10
}

export default class SourceDeletionAlert extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Modal style={{zIndex: 2, display: this.props.opened ? 'block' : 'none', width: '30%', height: '30%'}}
                   isOpen={this.props.opened} visible={this.props.opened} onRequestClose={this.props.onClose}
                   position={'center'} animationType={'slide'} contentLabel='Sources Deletion'>
                <Text style={titleInGreen}>Mauvaise nouvelle :</Text>
                <ScrollView style={{height:'100%', width:'100%'}}>
                    <View style={{backgroundColor:'#f4ecf4', display:'flex',flexDirection:'column',flexWrap:'nowrap',height:'100%',width:'100%'}}>
                        <Text>Suite à une demande de la SNCF, plusieurs sources (dont certaines que vous utilisez) ont été désactivées.</Text>
                        <Text/>
                        <Text>Les sources qui viennent d'être désactivées sur votre application sont les suivantes :</Text>
                        <Text/>
                        <View>{(this.props.deletedSources||['Aucune']).map(deletedSource => <Text key={deletedSource}>* {deletedSource}</Text>)}</View>
                        <Text/>
                        <Text>Une source de données faite maison a été réalisée pour éviter que l'application se retrouve sans contenu.</Text>
                        <Text>Il s'agit de 'herokuHomegrown'.</Text>
                        <Text>Cette source est d'une mauvaise précision, car mise à jour une fois par jour et sur des données théoriques</Text>
                        <Text/>
                        <Text>Elle n'est pas alimentée sur les circulations de trains grande vitesse (eurostar, inoui, ouigo, thalys, lyria)</Text>
                        <Text>Elle ne sait pas sur quels quais se trouvent les trains</Text>
                        <Text>Elle ne sait pas (encore) si les trains accusent du retard</Text>
                        <Text/>
                        <Text>Il se peut aussi que certains travaux et certaines coupures programmées ne soient pas signalés</Text>
                        <Text>Et a fortiori les coupures de service imprévues ne seront jamais signalées</Text>
                        <Text/>
                        <Text>Vous pouvez mettre 1/5 à cette app si vous le souhaitez.</Text>
                        <Text>Le développeur souhaite vous dire qu'il est reconnaissant pour l'intérêt que cette app a suscité chez vous depuis 2017</Text>
                        <Text/>
                        <Text>Il assume entièrement votre déception, et vous propose ces deux autres solutions :</Text>
                        <Text>- Il vous est toujours possible, contre quelques informations personnelles de votre part, de récuperer un token d'api</Text>
                        <Text>  Le token vous permet de continuer de beneficier des données en temps réel sur cette même application</Text>
                        <Text>- L'app officielle utilise les mêmes données (sans token) et permet d'accéder aux infos temps réel en illimité</Text>
                        <Text/>
                    </View>
                </ScrollView>
                <Button onPress={this.props.onClose} color='#ddc15d' title='😂'/>
            </Modal>
        )
    }
}


SourceDeletionAlert.propTypes = {
    deletedSources: PropTypes.array,
    onClose: PropTypes.func,
    opened: PropTypes.bool
}