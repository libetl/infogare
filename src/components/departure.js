import React from 'react'
import styles from '../css/app.css'
import PropTypes from 'prop-types'
import {Image, IsNative, LoadPicture, ScrollView, Text, TouchableHighlight, View} from '../wrapper'

export default class Departure extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const departure = this.props.departure || {}
        const directionName = (!departure.stops || departure.stops.length === 0 ||
            departure.stops[departure.stops.length - 1] === 'Desserte\u00a0non\u00a0dispo' ?
            departure.direction : departure.stops[departure.stops.length - 1]) || ' '
        const directionFontSize = Math.min(this.props.rowHeight * 0.3, this.props.rowWidth * 0.8 / directionName.length)
        const numberFontSize = Math.min(this.props.rowHeight * 0.1, this.props.rowWidth / directionName.length)
        const descriptionHeight = this.props.rowHeight * 0.3
        const style = {width: '100%', backgroundColor: this.props.odd ? '#0d5da6' : '#04396d', flexDirection: 'column',
            alignItems: 'center', flexWrap: 'wrap', height: `${70.0 / this.props.rows * (this.props.detailed ? 2 : 1)}%`}
        const mode = (departure.mode || '').toLowerCase()
        const lineColor = {width: '10%', height:this.props.detailed ? '45%' : '62%'}
        const lineColorText = {width:descriptionHeight, height:descriptionHeight,
            paddingTop: mode === 'metro' ? 0 : (this.props.rowHeight * 0.23  - numberFontSize) / 2,
            paddingBottom:(this.props.rowHeight * 0.23  - numberFontSize) / 2,
            fontSize: mode === 'metro' ? this.props.rowHeight * 0.2 : this.props.rowHeight * 0.11,
            textAlign: 'center', fontWeight: 'bold', borderStyle: 'solid', borderWidth: 3,
            borderRadius: mode === 'rer' || mode === 'metro' || mode === 'tramway' ? (IsNative ? 50 : '50%') : 3,
            borderColor: `#${departure.color || 'FFFFFF'}`,
            color:mode === 'metro' && departure.fontColor ? `#${departure.fontColor}` : `#${departure.color || 'FFFFFF'}`,
            backgroundColor: mode === 'metro' ? `#${departure.color}` : 'transparent'}
        const modeView = {width:'10%'}
        const modeIcon = {width: descriptionHeight, height: descriptionHeight, alignSelf: 'center'}
        const bigModeIcon = {height: descriptionHeight}
        const modeText = {color: '#fff', maxWidth: this.props.rowWidth * 0.25, fontSize: numberFontSize, fontWeight: 'bold', width: 60}
        const direction = {color: '#fff', fontSize: directionFontSize, overflow: 'hidden', flexGrow: 1}
        const split = {height:this.props.rowHeight * 0.3, width: '100%', flexDirection: 'row'}
        const stopsScroll = {height:this.props.rowHeight * 0.3, marginTop:this.props.rowHeight * 0.4, minHeight:12}
        const numberText = mode !== 'bus' ? {alignSelf: 'center', color:'#fff'} :
            {color: departure.fontColor ? '#' + departure.fontColor : '#fff', backgroundColor: departure.color ? '#' + departure.color : 'transparent', minWidth:numberFontSize * 3, alignSelf: 'center', textAlign: 'center', fontSize: numberFontSize}
        const number = {width: this.props.mustBePadded ? '25%' : '15%'}
        const timeAndStatus = {minWidth:3 * numberFontSize + 4, flexDirection: 'column'}
        const time = {color: '#dfc81f', fontSize: descriptionHeight / 3, fontWeight: 'bold'}
        const status = {color: '#f5a665', fontSize: numberFontSize, fontWeight: 'bold'}
        const platform = {color: '#fff', borderStyle: 'solid', borderWidth: 1, borderColor: '#fff', minWidth: 30, minHeight: 30, borderRadius: 6, width: numberFontSize, height: numberFontSize, textAlign: 'center', flexShrink: 1}
        const androidSpecialAttributes = IsNative ? {renderToHardwareTextureAndroid: true} : {}
        return (
            <View style={style} onLayout={event => this.props.parent.measureView(event, `row${this.props.num}`)}>
                <TouchableHighlight style={{flexDirection:'column', width: '100%', height:'100%'}} onPress={() => this.props.parent.viewOneDeparture(this.props.num)} underlayColor='white'>
                    <View style={{flexDirection:'column', height:'100%'}}>
                        <View style={this.props.detailed ? split : styles.dontsplit} >
                            <View style={modeView}>
                                {mode === 'bus' || mode === 'transilien'|| mode === 'rer' || mode === 'metro' || mode === 'tramway' ? <Image style={modeIcon} source={LoadPicture(mode)} /> :
                                    mode === 'intercités' || mode === 'intercités de nuit' ? <Image style={bigModeIcon} source={LoadPicture('intercites')} /> :
                                        <Text style={modeText}>{mode.toUpperCase()}</Text>}
                            </View>
                            {departure.name ? <View style={lineColor}><Text style={lineColorText}>{departure.name}</Text></View> : <Text>{departure.name}</Text>}
                            {departure.number !== departure.name ? <View style={number}><Text style={numberText}>{departure.number}</Text></View> : <Text style={{width:mode === 'metro' || mode === 'tramway' ? '15%' : '5%'}}/>}
                            <View style={timeAndStatus}><Text style={time}>{departure.time}</Text>{departure.status ? (<Text style={status}>{departure.status}</Text>) : <Text style={{display:'none'}}/>}</View>
                            {this.props.detailed || !departure.boardingPoint ? <Text style={direction}>{directionName}</Text> :
                                <View key={departure.boardingPoint} style={{overflow: 'hidden', flexGrow: 1}}>
                                    <Text style={{color:'#fff'}}>{directionName} </Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <Image style={{height: this.props.rowHeight * 0.15 - (IsNative ? 0 : 6), width: this.props.rowHeight * 0.15 - (IsNative ? 0 : 6)}} source={LoadPicture('walk')} />
                                        <Text style={{lineHeight: this.props.rowHeight * 0.15 - (IsNative ? 0 : 6), color: '#fff', fontSize: this.props.rowHeight * 0.075}}>{departure.boardingPoint}</Text>
                                    </View>
                                </View>}
                            <Text style={departure.platform && departure.platform.length > 0 ?
                                platform : styles.noPlatformYet}>{departure.platform}</Text>
                        </View>
                        {this.props.detailed &&
                        <ScrollView ref={(thisRef) => this.props.parent[`stopsListOfRow${this.props.detailsRow}`] = thisRef}
                                    {...androidSpecialAttributes}
                                    contentContainerStyle={styles.stops} style={stopsScroll}>
                            {this.props.detailed && departure.boardingPoint ?
                                (<View key={departure.boardingPoint} style={{flexDirection:'row'}}>
                                    <Image style={{height: this.props.rowHeight * 0.3 - (IsNative ? 0 : 6), width: this.props.rowHeight * 0.3 - (IsNative ? 0 : 6)}} source={LoadPicture('walk')} />
                                    <Text style={{lineHeight: this.props.rowHeight * 0.3 - (IsNative ? 0 : 6), color: '#fff', fontSize: this.props.rowHeight * 0.15}}>{departure.boardingPoint}</Text>
                                </View>): <Text/>}
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
    mustBePadded: PropTypes.bool,
    rowHeight: PropTypes.number,
    num : PropTypes.number,
    rows: PropTypes.number,
    detailed: PropTypes.bool,
    odd: PropTypes.bool,
    departure: PropTypes.object,
    parent: PropTypes.object
}
