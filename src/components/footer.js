import React from 'react'
import {Button, Text, View} from 'react-native'
import styles from '../css/app.css'
import moment from 'moment'

export default class Footer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.footer}>
                <Button onPress={this.props.updateLocation} title='↻' color='#841584'
                        accessibilityLabel='Mise à jour localisation'/>
                <Text style={styles.footerFont}>Gare trouvée : {this.props.station}</Text>
                <Text style={styles.now}>
                    <Text style={styles.hoursMinutes}>{
                        this.props.displayNowColon ? moment().format('HH:mm') : moment().format('HH mm') } </Text>
                    <Text style={styles.seconds}>{moment().format('ss')}</Text>
                </Text>
            </View>
        )
    }
}