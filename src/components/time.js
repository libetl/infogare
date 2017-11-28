import React from 'react'
import moment from 'moment'
import styles from '../css/app.css'
import {Text} from '../wrapper'

export default class Time extends React.Component {
    constructor(props) {
        super(props)
        this.state = props
        this.refreshScreen = this.refreshScreen.bind(this)
    }
    refreshScreen(){
        this.setState({displayNowColon:!this.state.displayNowColon})
    }
    componentWillMount(){
        this.setState({timer:setInterval(this.refreshScreen, 500), displayNowColon:true})
    }
    componentWillUnmount(){
        clearInterval(this.state.timer)
    }
    render() {
        const now = moment()
        return <Text style={styles.now}>
            <Text style={styles.hoursMinutes}>
                {this.state.displayNowColon ? now.format('HH:mm') : now.format('HH mm')}{' '}
            </Text>
            <Text style={styles.seconds}>{now.format('ss')}</Text>
        </Text>
    }
}