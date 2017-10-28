import React from 'react'
import styles from '../css/app.css'
import moment from 'moment'
import {Platform, Text, TouchableHighlight, TouchableNativeFeedback, View} from '../wrapper'

export default class Footer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.footer}>
                {Platform.OS === 'android' ?
                    <View style={{flexDirection:'column'}}>
                        <TouchableNativeFeedback
                            onLongPress={this.props.askForALocation} onPress={this.props.updateLocation}
                            background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>↻</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={this.props.openSettings}
                            background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>⚙</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View> : <View>
                        <TouchableHighlight
                            onLongPress={this.props.askForALocation} onPress={this.props.updateLocation}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>↻</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={this.props.openSettings}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>⚙</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                }
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