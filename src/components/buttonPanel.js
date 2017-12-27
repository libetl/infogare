import React from 'react'
import {Animated} from '../wrapper'

export default class ButtonPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {hideTimer: null, fadeAnim: new Animated.Value(1)}
        this.hide = this.hide.bind(this)
        this.show = this.show.bind(this)
        this.scheduleHide = this.scheduleHide.bind(this)
    }
    componentWillMount(){
        this.scheduleHide()
    }
    scheduleHide(){
        this.state.hideTimer && clearTimeout(this.state.hideTimer)
        this.setState({hideTimer: setTimeout(() => this.hide(), 2000)})
    }
    show(){
        this.scheduleHide()
        Animated.timing(this.state.fadeAnim, { toValue: 1, duration: 1}).start()
    }
    hide(){
        Animated.timing(this.state.fadeAnim, { toValue: 0, duration: 2000}).start()
    }
    render() {
        return (<Animated.View style={{opacity: this.state.fadeAnim, zIndex:10,
            position: 'absolute', right: '0%', bottom: '15%', width:'20%', height:'20%'}}>
            {this.props.children}
        </Animated.View>)
    }
}
