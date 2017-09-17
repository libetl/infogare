import React from 'react'
import { Button, Platform, Text, TouchableNativeFeedback, View } from 'react-native'
import styles from '../css/app.css'
import moment from 'moment'

export default class Footer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.footer}>
                <TouchableNativeFeedback
                    onLongPress={this.props.askForALocation} onPress={this.props.updateLocation} 
                    background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>↻</Text>
                    </View>
                </TouchableNativeFeedback>
                <Text style={styles.footerFont}>Gare trouvée : {this.props.station}</Text>
                <Text style={styles.now}>
                    <Text style={styles.hoursMinutes}>{
                        this.props.displayNowColon ? moment().format('HH:mm') : moment().format('HH mm')} </Text>
                    <Text style={styles.seconds}>{moment().format('ss')}</Text>
                </Text>
            </View>
        )
    }
}