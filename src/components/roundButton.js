import React from 'react'
import {
    Animated, Image, IsNative, LoadPicture, Text, TouchableOpacity, TouchableWithoutFeedback, View} from '../wrapper'

export default class RoundButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {width: `${100/props.nbButtons}%`, height: `${100/props.nbButtons}%`,
            fadeAnim: new Animated.Value(0), longPressHeight: 0}
        this.measureButton = this.measureButton.bind(this)
        this.display = this.display.bind(this)
        this.hide = this.hide.bind(this)
        this.displayOrHide = this.displayOrHide.bind(this)
        this.startRoll = this.startRoll.bind(this)
        this.stopRoll = this.stopRoll.bind(this)
    }
    startRoll(){
        if (this.props.longPressColor) {
            const timer = setInterval(() => this.state.height <= this.state.longPressHeight ?
                clearInterval(this.state.timer) && this.setState({timer: undefined})  :
                this.setState({longPressHeight: this.state.longPressHeight + 1}), 10)
            this.setState({timer})
        }
    }
    stopRoll(){
        this.state.timer && clearInterval(this.state.timer)
        this.state.height <= this.state.longPressHeight ? this.props.onLongClick() : this.props.onClick()
        this.setState({timer:undefined, longPressHeight: 0})
    }
    displayOrHide(nextProps = {visible:true}){
        if (!nextProps.visible && this.props.visible)
            this.hide()
        if (nextProps.visible && !this.props.visible)
            this.display()
    }
    display(){
        Animated.timing(this.state.fadeAnim, { toValue: 1, duration: 2000}).start()
    }
    hide(){
        Animated.timing(this.state.fadeAnim, { toValue: 0, duration: 1}).start()
    }
    componentWillReceiveProps(nextProps){
        this.displayOrHide(nextProps)
    }
    componentDidMount() {
        this.displayOrHide()
    }
    measureButton(event) {
        this.setState({height: event.nativeEvent.layout.height, width: event.nativeEvent.layout.width})
    }
    render() {
        const Touchable = this.props.longPressColor ? TouchableWithoutFeedback : TouchableOpacity
        return <Animated.View onLayout={this.measureButton} style={{opacity: this.state.fadeAnim,
            maxHeight: 100, maxWidth: 100, marginBottom: 5,
            width: isNaN(this.state.width) ? this.state.width : Math.max(this.state.height, this.state.width),
            height: isNaN(this.state.height) ? this.state.height : Math.max(this.state.height, this.state.width)}}>
            <View style={{height:this.state.height - this.state.longPressHeight, zIndex:11,
                width: this.state.width, overflow: 'hidden'}}>
                <Touchable onPressIn={this.startRoll} onPressOut={this.stopRoll}
                           onPress={!this.props.longPressColor ? this.props.onClick : undefined}
                           activeOpacity={!this.props.longPressColor ? 0.2 : 1.0}>
                    <View style={{backgroundColor: this.props.color,
                        borderRadius: IsNative ? 50 : '50%',
                        boxShadow: `2px 2px 2px 1px ${this.props.shadowColor || '#80808080'}`,
                        width: '100%', height: this.state.height, alignContent: 'center'}}>
                        {this.props.text && <Text style={{color: this.props.fontColor, textAlign: 'center',
                            fontSize: Math.min(this.state.width, this.state.height) / this.props.text.length}}>{
                            this.props.text}</Text>}
                        {this.props.image && <Image style={{height: this.state.height,
                            width: this.state.width}} source={LoadPicture(this.props.image)} />}
                    </View>
                </Touchable>
            </View>
            {this.props.longPressColor &&
            <View style={{height:this.state.longPressHeight,
                width: this.state.width, overflow: 'hidden'}}>
                <Touchable>
                    <View style={{backgroundColor: this.props.longPressColor,
                        borderRadius: IsNative ? 50 : '50%', position: 'relative', top: -this.state.height + this.state.longPressHeight,
                        boxShadow: `2px 2px 2px 1px ${this.props.shadowColor || '#80808080'}`,
                        width: '100%', height: this.state.height, alignContent: 'center'}}>
                        {this.props.longPressText && <Text style={{color: this.props.longPressFontColor, textAlign: 'center',
                            fontSize: Math.min(this.state.width, this.state.height) / this.props.text.length}}>{
                            this.props.longPressText}</Text>}
                        {this.props.longPressImage && <Image style={{height: this.state.height,
                            width: this.state.width}} source={LoadPicture(this.props.longPressImage)} />}
                    </View>
                </Touchable>
            </View>}
        </Animated.View>
    }
}