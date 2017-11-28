import React from 'react'
import styles from '../css/app.css'
import {Platform, Text, TouchableHighlight, View} from '../wrapper'
import Time from './time'

export default class Footer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <View style={styles.footer}>
            <View style={{flexDirection: 'column'}}>
                <TouchableHighlight onShowUnderlay={() => this.props.updateHightlightedComponent(this)}
                                    onLongPress={this.props.askForALocation} onPress={this.props.updateLocation}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>↻</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onShowUnderlay={() => this.props.updateHightlightedComponent(this)}
                                    onPress={this.props.openSettings}>
                    <View style={styles.button}>
                        <Text
                            style={styles.buttonText}>{Platform.OS === 'ios' || Platform.OS === 'web' || Platform.Version >= 21 ? '⚙' : '¤'}</Text>
                    </View>
                </TouchableHighlight>
            </View>
            <Text style={styles.footerFont}>Gare trouvée : {this.props.station}</Text>
            <Time/>
        </View>
    }
}