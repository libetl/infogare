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
            <Text style={styles.footerFont}>Gare trouvée : {this.props.station}</Text>
            <Time/>
        </View>
    }
}