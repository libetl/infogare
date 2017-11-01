import React from 'react'
import styles from '../css/app.css'
import PropTypes from 'prop-types'
import {Image, ScrollView, Text, TouchableHighlight, View, LoadPicture, IsNative} from '../wrapper'

export default class Departure extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const departure = this.props.departure || {}
        const directionName = (!departure.stops || departure.stops.length === 0 || departure.stops[departure.stops.length - 1] === 'Desserte non dispo' ?
            departure.direction : departure.stops[departure.stops.length - 1]) || ' '
        const directionFontSize = Math.min(this.props.rowHeight * 0.3, this.props.rowWidth * 0.45 / directionName.length)
        const numberFontSize = Math.min(this.props.rowHeight * 0.1, this.props.rowWidth / directionName.length)
        const stopsFontSize = this.props.rowHeight * 0.15
        const style = {width: '100%', backgroundColor: this.props.odd ? '#0d5da6' : '#04396d', flexDirection: 'column',
            alignItems: 'center', flexWrap: 'wrap', height: `${89.0 / this.props.rows * (this.props.detailed ? 2 : 1)}%`}
        const mode = (departure.mode || '').toLowerCase()
        const lineColorStyle = {fontSize:this.props.rowHeight * (this.props.detailed ? 0.11 : 0.11),
            width: '10%', height:this.props.detailed ? '23%' : '45%', textAlign: 'center',
            fontWeight: 'bold', borderStyle: 'solid', borderWidth: 3, borderRadius: mode === 'rer' ? 30 : 3,
            borderColor: `#${departure.color || 'FFFFFF'}`, color:`#${departure.color || 'FFFFFF'}`,
            marginTop: this.props.detailed ? 0 : 7}
        const modeIcon = this.props.detailed ? {height: '23%', width:'10%'} : {marginTop: 7, height: '45%', width:'10%'}
        const bigModeIcon = this.props.detailed ? {height: '23%', width:'22%'} : {marginTop: 7, height: '45%', width:'22%'}
        const modeText = this.props.detailed ?
            {color: '#fff', minWidth: this.props.rowWidth * 0.25, fontSize: Math.min(this.props.rowHeight * 0.45, this.props.rowWidth  * 0.20 / mode.length), fontWeight: 'bold', width: 60} :
            {color: '#fff', minWidth: this.props.rowWidth * 0.25, fontSize: Math.min(this.props.rowHeight * 0.23, this.props.rowWidth  * 0.20 / mode.length), fontWeight: 'bold', width: 60}
        const lineHeight = Math.ceil(stopsFontSize + 4)
        const oneStop = IsNative ? {color: '#fff', fontSize: stopsFontSize, lineHeight, includeFontPadding:false} : {color: '#fff', fontSize: stopsFontSize, lineHeight}
        const direction = {color: '#fff', fontSize: directionFontSize, overflow: 'hidden', flexGrow: 1}
        const split = {marginBottom: -lineHeight, height: '100%', width: '100%', flexDirection: 'row'}
        const numberText = mode !== 'bus' ? {alignSelf: 'center'} :
            {color: departure.fontColor || '#fff', backgroundColor: departure.color || 'transparent', minWidth:numberFontSize * 3, alignSelf: 'center', textAlign: 'center', fontSize: numberFontSize}
        const number = {color: '#fff', width: '15%', fontSize: numberFontSize}
        const timeAndStatus = {width: '20%', flexDirection: 'column'}
        const time = {color: '#dfc81f', fontSize: numberFontSize, fontWeight: 'bold'}
        const status = {color: '#f5a665', fontSize: numberFontSize, fontWeight: 'bold'}
        const platform = {color: '#fff', borderStyle: 'solid', borderWidth: 1, borderColor: '#fff', minWidth: 30, minHeight: 30, borderRadius: 6, width: numberFontSize, height: numberFontSize, textAlign: 'center', flexShrink: 1}
        const androidSpecialAttributes = IsNative ? {renderToHardwareTextureAndroid: true} : {}
        return (
            <View style={style} onLayout={(event) => this.props.parent.measureView(event, `row${this.props.num}`)}>
                <TouchableHighlight style={{width: '100%', height:'100%'}} onPress={() => this.props.parent.viewOneDeparture(this.props.num)} underlayColor='white'>
                    <View>
                        <View style={this.props.detailed ? split : styles.dontsplit} >
                            {mode === 'transilien' ? <Image style={modeIcon} source={LoadPicture('transilien')} /> :
                                mode === 'rer' ? <Image style={modeIcon} source={LoadPicture('rer')} /> :
                                    mode === 'intercités' ? <Image style={bigModeIcon} source={LoadPicture('intercites')} /> :
                                        mode === 'intercités de nuit' ? <Image style={bigModeIcon} source={LoadPicture('intercites')} /> :
                                            <Text style={modeText}>{mode.toUpperCase()}</Text>}
                            {departure.name ? <Text style={lineColorStyle}>{departure.name}</Text> : <Text>{departure.name}</Text>}
                            <View style={number}><Text style={numberText}>{departure.number}</Text></View>
                            <View style={timeAndStatus}><Text style={time}>{departure.time}</Text>{departure.status ? (<Text style={status}>{departure.status}</Text>) : <Text/>}</View>
                            <Text style={direction}>{directionName}</Text>
                            <Text style={departure.platform && departure.platform.length > 0 ?
                                platform : styles.noPlatformYet}>{departure.platform}</Text>
                        </View>
                        {this.props.detailed &&
                        <ScrollView ref={(thisRef) => this.props.parent[`stopsListOfRow${this.props.detailsRow}`] = thisRef}
                                    {...androidSpecialAttributes}
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
