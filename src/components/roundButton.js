import React from 'react'
import {Animated, IsNative, Text, TouchableOpacity} from '../wrapper'

export default class RoundButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {width: '10%', height:'10%',
            fadeAnim: new Animated.Value(0)}
        this.measureButton = this.measureButton.bind(this)
    }
    componentDidMount() {
        Animated.timing(this.state.fadeAnim, { toValue: 1, duration: 2000}).start()
    }
    measureButton(event) {
        this.setState({height: event.nativeEvent.layout.height, width: event.nativeEvent.layout.width})
    }
    render() {
        return <Animated.View onLayout={this.measureButton} style={{opacity: this.state.fadeAnim,
            maxHeight: 100, maxWidth: 100, marginBottom: 5,
            left: !this.props.align || this.props.align.includes('right') ? '100%' : 0,
            top: !this.props.align || this.props.align.includes('bottom') ? '100%' : 0,
            width: this.state.width > this.state.height ? '10%' : this.state.height,
            height: this.state.height > this.state.width ? '10%' : this.state.width,}}>
            <TouchableOpacity onPress={this.props.onClick} style={{backgroundColor: this.props.color, borderRadius: IsNative ? 50 : '50%',
                boxShadow: `1px 1px ${this.props.shadowColor || '#808080'}`,
                width: '100%', height: '100%', alignContent: 'center'}}>
                <Text style={{color: this.props.fontColor, textAlign: 'center',
                    fontSize: Math.min(this.state.width, this.state.height)}}>{
                    this.props.text}</Text>
            </TouchableOpacity>
        </Animated.View>
    }
}