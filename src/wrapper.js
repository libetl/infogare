const React = require('react')
try {
    global.nativeLibrary = global.nativeLibrary || require('react-native')
}catch(e){
}

const Image=global.nativeLibrary.Image || function(props){ return (<img src={props.source} alt={props.alt}/>)}
const ScrollView=global.nativeLibrary.ScrollView || 'div'
const Text=global.nativeLibrary.Text || 'p'
const TouchableHighlight=global.nativeLibrary.TouchableHighlight || 'button'
const View=global.nativeLibrary.View || 'div'
const Button=global.nativeLibrary.Button || 'button'
const Modal=global.nativeLibrary.Modal || 'div'
const StyleSheet=global.nativeLibrary.StyleSheet || {create: (data) => data}
const Platform=global.nativeLibrary.Platform || {OS:'browser'}
const TouchableNativeFeedback=global.nativeLibrary.TouchableNativeFeedback || 'button'
const TextInput=global.nativeLibrary.TextInput || 'input'
const Switch=global.nativeLibrary.Switch || 'input'
const RefreshControl=global.nativeLibrary.RefreshControl || 'div'
const Constants={statusBarHeight:16}
const AsyncStorage = global.nativeLibrary.AsyncStorage || 
{getItem: name => Promise.resolve(window.localStorage.getItem(name)),
    setItem: (name, value) => Promise.resolve(window.localStorage.setItem(name, value))}
const LoadPicture = window ? (url) => url.replace(/\.\.\/images/, '../src/images') : require
const IsNative = window === undefined
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
    Constants,
    LoadPicture,
    IsNative
}