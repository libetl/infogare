let native = {}
try {native = require('react-native')}catch(e){}

const AsyncStorage= native.AsyncStorage || 
    {getItem: name => Promise.resolve(window.localStorage.getItem(name)),
        setItem: (name, value) => Promise.resolve(window.localStorage.setItem(name, value))}
const Image=native.Image || 'img'
const ScrollView=native.ScrollView || 'div'
const Text=native.Text || 'p'
const TouchableHighlight=native.TouchableHighlight || 'button'
const View=native.View || 'div'
const Button=native.Button || 'button'
const Modal=native.Modal || 'div'
const StyleSheet=native.StyleSheet || {create: (data) => data}
const Platform=native.Platform || {OS:'browser'}
const TouchableNativeFeedback=native.TouchableNativeFeedback || 'button'
const TextInput=native.TextInput || 'input'
const Switch=native.Switch || 'input'
const RefreshControl=native.RefreshControl || 'div'
const Constants={statusBarHeight:16}

export {
    AsyncStorage,
    Image,
    ScrollView,
    Text,
    TouchableHighlight,
    View,
    Button,
    Modal,
    StyleSheet,
    Platform,
    TouchableNativeFeedback,
    TextInput,
    Switch,
    RefreshControl,
    Constants
}