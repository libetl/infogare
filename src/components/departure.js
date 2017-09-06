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
        const directionName = (!departure.stops || departure.stops.length === 0? departure.direction : departure.stops[departure.stops.length - 1]) || ' '
        const directionFontSize = Math.min(this.props.rowHeight * 0.3, this.props.rowWidth * 0.45 / directionName.length)
        const numberFontSize = Math.min(this.props.rowHeight * 0.1, this.props.rowWidth / directionName.length)
        const stopsFontSize = this.props.rowHeight * 0.15
        const style = {width: '100%', backgroundColor: this.props.odd ? '#0d5da6' : '#04396d', flexDirection: 'column',
            alignItems: 'center', flexWrap: 'wrap', height: `${89.0 / this.props.rows * (this.props.detailed ? 2 : 1)}%`}
        const mode = (departure.mode || '').toLowerCase()
        const lineColorStyle = {fontSize:this.props.rowHeight * (this.props.detailed ? 0.11 : 0.11),
            width: '10%', height:this.props.detailed ? '23%' : '45%', textAlign: 'center',
            fontWeight: 'bold', borderStyle: 'solid', borderWidth: 3, borderRadius: mode === 'rer' ? 30 : 3,
            borderColor: `#${departure.color}`, color:`#${departure.color}`,
            marginTop: this.props.detailed ? 0 : 7}
        const modeIcon = this.props.detailed ? {height: '23%', width:'10%'} : {marginTop: 7, height: '45%', width:'10%'}
        const bigModeIcon = this.props.detailed ? {height: '23%', width:'22%'} : {marginTop: 7, height: '45%', width:'22%'}
        const modeText = this.props.detailed ?
            {color: '#fff', minWidth: this.props.rowWidth * 0.25, fontSize: Math.min(this.props.rowHeight * 0.45, this.props.rowWidth  * 0.20 / mode.length), fontWeight: 'bold', width: 60} :
            {color: '#fff', minWidth: this.props.rowWidth * 0.25, fontSize: Math.min(this.props.rowHeight * 0.23, this.props.rowWidth  * 0.20 / mode.length), fontWeight: 'bold', width: 60}
        const lineHeight = Math.ceil(stopsFontSize + 4)
        const oneStop = {color: '#fff', fontSize: stopsFontSize, lineHeight, includeFontPadding:false}
        const direction = {color: '#fff', fontSize: directionFontSize, overflow: 'hidden', flexGrow: 1}
        const split = {marginBottom: -lineHeight, height: '100%', width: '100%', flexDirection: 'row'}
        const number = {color: '#fff', width: '15%', fontSize: numberFontSize}
        const time = departure.time.match(/[0-9][0-9]:[0-9][0-9]/) ? {color: '#dfc81f', width: '20%', fontSize: numberFontSize, fontWeight: 'bold'} :
            {color: '#f5a665', width: '20%', fontSize: numberFontSize, fontWeight: 'bold'}
        const platform = {color: '#fff', borderStyle: 'solid', borderWidth: 1, borderColor: '#fff', minWidth: 30, minHeight: 30, borderRadius: 6, width: numberFontSize, height: numberFontSize, textAlign: 'center', flexShrink: 1}
        return (
            <View style={style} onLayout={(event) => this.props.parent.measureView(event, `row${this.props.num}`)}>
                <TouchableHighlight style={{width: '100%', height:'100%'}} onPress={() => this.props.parent.viewOneDeparture(this.props.num)} underlayColor='white'>
                    <View>
                        <View style={this.props.detailed ? split : styles.dontsplit} >
                            {mode === 'transilien' ? <Image style={modeIcon} source={require('../images/transilien.png')} /> :
                                mode === 'rer' ? <Image style={modeIcon} source={require('../images/rer.png')} /> :
                                    mode === 'intercités' ? <Image style={bigModeIcon} source={require('../images/intercites.png')} /> :
                                        mode === 'intercités de nuit' ? <Image style={bigModeIcon} source={require('../images/intercites.png')} /> :
                                            <Text style={modeText}>{mode.toUpperCase()}</Text>}
                            {departure.name ? <Text style={lineColorStyle}>{departure.name}</Text> : <Text>{departure.name}</Text>}
                            <Text style={number}>{departure.number}</Text>
                            <Text style={time}>{departure.time}  </Text>
                            <Text style={direction}>{directionName}</Text>
                            <Text style={departure.platform && departure.platform.length > 0 ?
                                platform : styles.noPlatformYet}>{departure.platform}</Text>
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
