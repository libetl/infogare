import React from 'react'
import {Image, PixelRatio, ScrollView, Text, TouchableHighlight, View} from 'react-native'
import styles from '../css/app.css'
import PropTypes from 'prop-types'

export default class Departure extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const departure = this.props.departure || {}
        const directionName = (!departure.stops ? departure.direction : departure.stops[departure.stops.length - 1]) || ' '
        const firstLineFontSize = Math.min(this.props.rowHeight * 0.3, this.props.rowWidth / directionName.length)
        const stopsFontSize = this.props.rowHeight * 0.15
        const style = {width: '100%', backgroundColor: this.props.odd ? '#0d5da6' : '#04396d', flexDirection: 'column',
            alignItems: 'center', flexWrap: 'wrap', height: `${89.0 / this.props.rows * (this.props.detailed ? 2 : 1)}%`}
        const mode = (departure.mode || '').toLowerCase()
        const lineColorStyle = {fontSize:this.props.rowHeight * (this.props.detailed ? 0.11 : 0.11),
            width: '10%', height:this.props.detailed ? '23%' : '45%', textAlign: 'center',
            fontWeight: 'bold', borderStyle: 'solid', borderWidth: 3, borderRadius: mode === 'rer' ? 30 : 3,
            borderColor: `#${departure.color}`, color:`#${departure.color}`,
            marginTop: this.props.detailed ? 0 : 7}
        const modeIcon = this.props.detailed ? {flexShrink: 1, height: '23%', width:'10%'} :
            {marginTop: 7, flexShrink: 1, height: '45%', width:'10%'}
        const modeText = this.props.detailed ?
            {color: '#fff', fontSize: this.props.rowHeight * 0.45, fontWeight: 'bold', flexShrink: 1, width: 60} :
            {color: '#fff', fontSize: this.props.rowHeight * 0.23, fontWeight: 'bold', flexShrink: 1, width: 60}
        const bigModeIcon = this.props.detailed ? styles.bigModeIcon : styles.bigModeIconPadding
        const lineHeight = Math.ceil((stopsFontSize + 6) * PixelRatio.get())
        const oneStop = {color: '#fff', fontSize: stopsFontSize, lineHeight, includeFontPadding:false}
        const direction = {color: '#fff', fontSize: firstLineFontSize, overflow: 'hidden'}
        const split = {marginBottom: -lineHeight, height: '100%', width: '100%', flexDirection: 'row'}
        return (
            <View style={style} onLayout={(event) => this.props.parent.measureView(event, `row${this.props.num}`)}>
                <TouchableHighlight style={{width: '100%',height:'100%'}} onPress={() => this.props.parent.viewOneDeparture(this.props.num)} underlayColor='white'>
                    <View>
                        <View style={this.props.detailed ? split : styles.dontsplit} >
                            {mode === 'transilien' ? <Image style={modeIcon} source={require('../images/transilien.png')} /> :
                                mode === 'rer' ? <Image style={modeIcon} source={require('../images/rer.png')} /> :
                                    mode === 'intercités' ? <Image style={bigModeIcon} source={require('../images/intercites.png')} /> :
                                        mode === 'intercités de nuit' ? <Image style={bigModeIcon} source={require('../images/intercites.png')} /> :
                                            <Text style={modeText}>{mode.toUpperCase()}</Text>}
                            {departure.name ? <Text style={lineColorStyle}>{departure.name}</Text> : <Text>{departure.name}</Text>}
                            <Text style={styles.number}>{departure.number}</Text>
                            <Text style={styles.time}>{departure.time}  </Text>
                            <Text style={direction}>{directionName}</Text>
                            <Text style={departure.platform && departure.platform.length > 0 ?
                                styles.platform : styles.noPlatformYet}>{departure.platform}</Text>
                        </View>
                        {this.props.detailed &&
                        <ScrollView ref={(thisRef) => this.props.parent[`stopsListOfRow${this.props.detailsRow}`] = thisRef}
                                    contentContainerStyle={styles.stops} style={styles.scroll}>
                            <Text onLayout={(event) => this.props.parent.measureView(event, `stopsListOfRow${this.props.detailsRow}`)}>{!departure.stops ? '' :
                                departure.stops.map(stop => (
                                    <Text key={stop}><Text style={oneStop}> {stop} </Text>
                                        <Text style={styles.yellowBullet}>•</Text></Text>))}</Text></ScrollView>}
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

Departure.propTypes = {
    rowHeight: PropTypes.number,
    num : PropTypes.number,
    rows: PropTypes.number,
    detailed: PropTypes.bool,
    odd: PropTypes.bool,
    departure: PropTypes.object,
    parent: PropTypes.object
}
