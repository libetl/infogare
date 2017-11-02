import React from 'react'
import styles from '../css/app.css'
import PropTypes from 'prop-types'
import {Image, IsNative, LoadPicture, ScrollView, Text, TouchableHighlight, View} from '../wrapper'
import {blackOrWhite} from '../core/operations/blackOrWhite'

export default class Departure extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const departure = this.props.departure || {}
        const directionName = (!departure.stops || departure.stops.length === 0 || departure.stops[departure.stops.length - 1] === 'Desserte non dispo' ?
            departure.direction : departure.stops[departure.stops.length - 1]) || ' '
        const directionFontSize = Math.min(this.props.rowHeight * 0.3, this.props.rowWidth * 0.8 / directionName.length)
        const numberFontSize = Math.min(this.props.rowHeight * 0.1, this.props.rowWidth / directionName.length)
        const style = {width: '100%', backgroundColor: this.props.odd ? '#0d5da6' : '#04396d', flexDirection: 'column',
            alignItems: 'center', flexWrap: 'wrap', height: `${70.0 / this.props.rows * (this.props.detailed ? 2 : 1)}%`}
        const mode = (departure.mode || '').toLowerCase()
        const lineColor = {width: '10%', height:'45%'}
        const lineColorText = {width:numberFontSize * 3, height:numberFontSize * 3,
            paddingTop:(this.props.rowHeight * 0.23  - numberFontSize) / 2,
            paddingBottom:(this.props.rowHeight * 0.23  - numberFontSize) / 2,
            fontSize:this.props.rowHeight * 0.11,
            textAlign: 'center', fontWeight: 'bold', borderStyle: 'solid', borderWidth: 3,
            borderRadius: mode === 'rer' || mode === 'metro' || mode === 'tramway' ? (IsNative ? 50 : '50%') : 3,
            borderColor: `#${departure.color || 'FFFFFF'}`,
            color:mode === 'metro' ? blackOrWhite(departure.color || '#000000') : `#${departure.color || 'FFFFFF'}`,
            backgroundColor: mode === 'metro' ? `#${departure.color}` : undefined}
        const modeView = {width:'10%'}
        const modeIcon = {width: numberFontSize * 3, height: numberFontSize * 3, alignSelf: 'center'}
        const bigModeIcon = this.props.detailed ? {height: '23%', width:'22%'} : {marginTop: 7, height: '45%', width:'22%'}
        const modeText = {color: '#fff', maxWidth: this.props.rowWidth * 0.25, fontSize: numberFontSize, fontWeight: 'bold', width: 60}
        const direction = {color: '#fff', fontSize: directionFontSize, overflow: 'hidden', flexGrow: 1}
        const split = {height:this.props.rowHeight * 0.3, width: '100%', flexDirection: 'row'}
        const stopsScroll = {height:this.props.rowHeight * 0.3, marginTop:this.props.rowHeight * 0.4, minHeight:12}
        const numberText = mode !== 'bus' ? {alignSelf: 'center', color:'#fff'} :
            {color: '#' + departure.fontColor || '#fff', backgroundColor: '#' + departure.color || 'transparent', minWidth:numberFontSize * 3, alignSelf: 'center', textAlign: 'center', fontSize: numberFontSize}
        const number = {width: '15%'}
        const timeAndStatus = {minWidth:3 * numberFontSize + 4, flexDirection: 'column'}
        const time = {color: '#dfc81f', fontSize: numberFontSize, fontWeight: 'bold'}
        const status = {color: '#f5a665', fontSize: numberFontSize, fontWeight: 'bold'}
        const platform = {color: '#fff', borderStyle: 'solid', borderWidth: 1, borderColor: '#fff', minWidth: 30, minHeight: 30, borderRadius: 6, width: numberFontSize, height: numberFontSize, textAlign: 'center', flexShrink: 1}
        const androidSpecialAttributes = IsNative ? {renderToHardwareTextureAndroid: true} : {}
        return (
            <View style={style} onLayout={event => this.props.parent.measureView(event, `row${this.props.num}`)}>
                <TouchableHighlight style={{flexDirection:'column', width: '100%', height:'100%'}} onPress={() => this.props.parent.viewOneDeparture(this.props.num)} underlayColor='white'>
                    <View style={{flexDirection:'column', height:'100%'}}>
                        <View style={this.props.detailed ? split : styles.dontsplit} >
                            <View style={modeView}>
                                {mode === 'bus' || mode === 'transilien'|| mode === 'rer' || mode === 'tramway' ? <Image style={modeIcon} source={LoadPicture(mode)} /> :
                                    mode === 'intercités' || mode === 'intercités de nuit' ? <Image style={bigModeIcon} source={LoadPicture('intercites')} /> :
                                        <Text style={modeText}>{mode.toUpperCase()}</Text>}
                            </View>
                            {departure.name ? <View style={lineColor}><Text style={lineColorText}>{departure.name}</Text></View> : <Text>{departure.name}</Text>}
                            {departure.number !== departure.name ? <View style={number}><Text style={numberText}>{departure.number}</Text></View> : <Text style={{width:'5%'}}/>}
                            <View style={timeAndStatus}><Text style={time}>{departure.time}</Text>{departure.status ? (<Text style={status}>{departure.status}</Text>) : <Text style={{display:'none'}}/>}</View>
                            <Text style={direction}>{directionName}</Text>
                            <Text style={departure.platform && departure.platform.length > 0 ?
                                platform : styles.noPlatformYet}>{departure.platform}</Text>
                        </View>
                        {this.props.detailed &&
                        <ScrollView ref={(thisRef) => this.props.parent[`stopsListOfRow${this.props.detailsRow}`] = thisRef}
                                    {...androidSpecialAttributes}
                                    contentContainerStyle={styles.stops} style={stopsScroll}>
                            <Text onLayout={event => this.props.parent.measureView(event, `stopsListOfRow${this.props.detailsRow}`)}>{!departure.stops ? '' :
                                departure.stops.map(stop => (
                                    <Text style={{lineHeight: this.props.rowHeight * 0.3 - (IsNative ? 0 : 6)}} key={stop}>
                                        <Text style={{color: '#fff', fontSize: this.props.rowHeight * 0.3 - (IsNative ? 0 : 6)}}> </Text>
                                        <Text style={{color: '#fff', fontSize: this.props.rowHeight * 0.15}}>{stop}</Text>
                                        <Text style={{color: '#fff', fontSize: this.props.rowHeight * 0.3 - (IsNative ? 0 : 6)}}> </Text>
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
