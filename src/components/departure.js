import React from 'react'
import styles from '../css/app.css'
import PropTypes from 'prop-types'
import {Image, IsNative, LoadPicture, ScrollView, Text, TouchableHighlight, View} from '../wrapper'

export default class Departure extends React.Component {
    constructor(props) {
        super(props)
        this.state = {scrollFromTop: 3, timer:null}
        this.scrollJourney = this.scrollJourney.bind(this)
        this.measureAllComponent = this.measureAllComponent.bind(this)
        this.measureJourney = this.measureJourney.bind(this)
    }
    componentWillMount(){
        if (this.props.detailed){
            this.setState({timer:setInterval(this.scrollJourney, 3000)})
        }
    }
    componentWillUnmount(){
        if (this.props.detailed){
            clearInterval(this.state.timer)
        }
    }
    measureAllComponent(event) {
        this.setState({height: event.nativeEvent.layout.height, width: event.nativeEvent.layout.width})
    }
    measureJourney(event) {
        this.setState({journeyHeight: event.nativeEvent.layout.height})
    }
    scrollJourney(){
        if (this.stopsList && this.stopsList.scrollTo) {
            const fromTop = 3
            const delta = (this.state.height || 60) * (IsNative ? 0.272 : 0.3)
            const maybeNextScroll = (this.state.scrollFromTop||3) + delta
            this.setState({
                scrollFromTop: maybeNextScroll >= this.state.journeyHeight ? fromTop : maybeNextScroll
            })
            this.stopsList.scrollTo({x: 0, y: this.state.scrollFromTop, animated: true})
        }
    }
    render() {
        const baseFontSize = this.state.height * 0.15
        const doubleBaseFontSize = 2 * baseFontSize
        const zoom = this.props.detailed ? 1 : 2
        const departure = this.props.departure || {}
        const directionName = (!departure.stops || departure.stops.length === 0 ||
            departure.stops[departure.stops.length - 1] === 'Desserte\u00a0non\u00a0dispo' ?
            departure.direction : departure.stops[departure.stops.length - 1]) || ' '
        const directionFontSize = Math.min(doubleBaseFontSize * zoom, this.state.width * 0.8 / directionName.length)
        const numberFontSize = Math.min(this.state.height * 0.1 * zoom, this.state.width / directionName.length)
        const descriptionSize = doubleBaseFontSize * zoom
        const style = {width: '100%', backgroundColor: this.props.odd ? '#0d5da6' : '#04396d', flexDirection: 'column',
            alignItems: 'center', flexWrap: 'wrap', height: this.props.height}
        const mode = (departure.mode || '').toLowerCase()
        const lineColor = {width: '10%', height:this.props.detailed ? '45%' : '62%'}
        const lineColorText = {width:descriptionSize, height:descriptionSize,
            paddingTop: mode === 'metro' ? 0 : (this.state.height * 0.23 * zoom  - numberFontSize) / 2,
            paddingBottom:(this.state.height * 0.23  - numberFontSize) / 2,
            fontSize: mode === 'metro' ? this.state.height * 0.2 * zoom : this.state.height * 0.11 * zoom,
            textAlign: 'center', fontWeight: 'bold', borderStyle: 'solid', borderWidth: 3,
            borderRadius: mode === 'rer' || mode === 'metro' || mode === 'tramway' ? (IsNative ? 50 : '50%') : 3,
            borderColor: `#${departure.color || 'FFFFFF'}`,
            color:mode === 'metro' && departure.fontColor ? `#${departure.fontColor}` : `#${departure.color || 'FFFFFF'}`,
            backgroundColor: mode === 'metro' ? `#${departure.color}` : 'transparent'}
        const modeView = {width:'10%'}
        const modeIcon = {width: descriptionSize, height: descriptionSize, alignSelf: 'center'}
        const bigModeIcon = {height: descriptionSize}
        const modeText = {color: '#fff', maxWidth: this.state.width * 0.25, fontSize: numberFontSize, fontWeight: 'bold', width: 60}
        const direction = {color: '#fff', fontSize: directionFontSize, overflow: 'hidden', flexGrow: 1}
        const split = {height:doubleBaseFontSize, width: '100%', flexDirection: 'row'}
        const stopsScroll = {height:doubleBaseFontSize, marginTop:this.state.height * 0.4, minHeight:12}
        const numberText = mode !== 'bus' ? {alignSelf: 'center', color:'#fff'} :
            {color: departure.fontColor ? '#' + departure.fontColor : '#fff', backgroundColor: departure.color ? '#' + departure.color : 'transparent', minWidth:numberFontSize * 3, alignSelf: 'center', textAlign: 'center', fontSize: numberFontSize}
        const number = {width: this.props.mustBePadded ? '25%' : '15%'}
        const timeAndStatus = {minWidth:3 * numberFontSize + 4, flexDirection: 'column'}
        const time = {color: '#dfc81f', fontSize: descriptionSize / 3, fontWeight: 'bold'}
        const status = {color: '#f5a665', fontSize: numberFontSize, fontWeight: 'bold'}
        const platform = {color: '#fff', borderStyle: 'solid', borderWidth: 1, borderColor: '#fff', minWidth: 30, minHeight: 30, borderRadius: 6, width: numberFontSize, height: numberFontSize, textAlign: 'center', flexShrink: 1}
        const androidSpecialAttributes = IsNative ? {renderToHardwareTextureAndroid: true} : {}
        return (
            <View style={style} onLayout={this.measureAllComponent}>
                <TouchableHighlight style={{flexDirection:'column', width: '100%', height:'100%'}} onPress={() => this.props.viewOneDeparture(this.props.num)} underlayColor='white'>
                    <View style={{flexDirection:'column', height:'100%'}}>
                        <View style={this.props.detailed ? split : styles.dontsplit} >
                            <View style={modeView}>
                                {mode === 'bus' || mode === 'transilien'|| mode === 'rer' || mode === 'metro' || mode === 'tramway' ? <Image style={modeIcon} source={LoadPicture(mode)} /> :
                                    mode === 'intercités' || mode === 'intercités de nuit' ? <Image style={bigModeIcon} source={LoadPicture('intercites')} /> :
                                        <Text style={modeText}>{mode.toUpperCase()}</Text>}
                            </View>
                            {departure.name ? <View style={lineColor}><Text style={lineColorText}>{departure.name}</Text></View> : <Text>{departure.name}</Text>}
                            {departure.number !== departure.name ? <View style={number}><Text style={numberText}>{departure.number}</Text></View> : <Text style={{width:'5%'}}/>}
                            <View style={timeAndStatus}><Text style={time}>{departure.time}</Text>{departure.status ? (<Text style={status}>{departure.status}</Text>) : <Text style={{display:'none'}}/>}</View>
                            {this.props.detailed || !departure.boardingPoint ? <Text style={direction}>{directionName}</Text> :
                                <View key={departure.boardingPoint} style={{overflow: 'hidden', flexGrow: 1}}>
                                    <Text style={{color:'#fff'}}>{directionName} </Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <Image style={{height: baseFontSize * zoom - (IsNative ? 0 : 6), width: baseFontSize * zoom - (IsNative ? 0 : 6)}} source={LoadPicture('walk')} />
                                        <Text style={{lineHeight: baseFontSize * zoom - (IsNative ? 0 : 6), color: '#fff', fontSize: this.state.height * 0.075 * zoom}}>{departure.boardingPoint}</Text>
                                    </View>
                                </View>}
                            <Text style={departure.platform && departure.platform.length > 0 ?
                                platform : styles.noPlatformYet}>{departure.platform}</Text>
                        </View>
                        {this.props.detailed &&
                        <ScrollView ref={thisRef => this.stopsList = thisRef}
                                    {...androidSpecialAttributes}
                                    contentContainerStyle={styles.stops} style={stopsScroll}>
                            {this.props.detailed && departure.boardingPoint ?
                                (<View key={departure.boardingPoint} style={{flexDirection:'row'}}>
                                    <Image style={{height: doubleBaseFontSize * zoom - (IsNative ? 0 : 6), width: doubleBaseFontSize * zoom  - (IsNative ? 0 : 6)}} source={LoadPicture('walk')} />
                                    <Text style={{lineHeight: doubleBaseFontSize * zoom  - (IsNative ? 0 : 6), color: '#fff', fontSize: baseFontSize * zoom }}>{departure.boardingPoint}</Text>
                                </View>): <Text/>}
                            <Text onLayout={this.measureJourney} style={{padding:0, color: '#fff'}}>{
                                !departure.stops ? <Text/> : departure.stops.map(stop => (<Text key={stop} style={{fontSize: baseFontSize, lineHeight: doubleBaseFontSize}}> {stop} <Text style={styles.yellowBullet}>•</Text></Text>))
                            }</Text></ScrollView>}
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

Departure.propTypes = {
    mustBePadded: PropTypes.bool,
    num : PropTypes.number,
    height: PropTypes.string,
    detailed: PropTypes.bool,
    odd: PropTypes.bool,
    departure: PropTypes.object,
    viewOneDeparture: PropTypes.func
}
