const React = require('react')
import pictures from './images/base64pictures'

try {global.nativeLibrary = global.nativeLibrary || require('react-native')}catch(e){}
try{const test = global.nativeLibrary.NativeModules}catch (e){
    global.nativeLibrary = {NativeModules:{BuildConfig:{PRIVILEGED:true}}}}
const config = global.nativeLibrary.NativeModules && global.nativeLibrary.NativeModules.BuildConfig || {}
const IsNative = global.nativeLibrary.Platform &&
    ['android', 'ios'].includes(global.nativeLibrary.Platform.OS)
const LoadPicture = name => pictures[name]
const Image=global.nativeLibrary.Image || function(props){ return (<img src={props.source} alt={props.alt}/>)}
const ScrollView=global.nativeLibrary.ScrollView || 'div'
const Text=global.nativeLibrary.Text || 'p'
const Dimensions=global.nativeLibrary.Dimensions || {get: () => 0, addEventListener :()=>{}}
const TouchableOpacity=global.nativeLibrary.TouchableOpacity || 'button'
const TouchableHighlight=global.nativeLibrary.TouchableHighlight || 'button'
const View=global.nativeLibrary.View || 'div'
const Button=global.nativeLibrary.Button || 'button'
const Modal=global.nativeLibrary.Modal || 'div'
const StyleSheet=global.nativeLibrary.StyleSheet || {create: (data) => data}
const Platform=global.nativeLibrary.Platform || {OS:'browser'}
const TouchableWithoutFeedback=global.nativeLibrary.TouchableWithoutFeedback || 'button'
const TouchableNativeFeedback=global.nativeLibrary.TouchableNativeFeedback || 'button'
const TextInput=global.nativeLibrary.TextInput || 'input'
const Switch=global.nativeLibrary.Switch || 'input'
const RefreshControl=global.nativeLibrary.RefreshControl || 'div'
const Constants={statusBarHeight:16}
const AsyncStorage = global.nativeLibrary.AsyncStorage || 
{getItem: name => Promise.resolve(window.localStorage.getItem(name)),
    setItem: (name, value) => Promise.resolve(window.localStorage.setItem(name, value))}
const Animated=global.nativeLibrary.Animated || {value:()=>{return{}}}
export {
    Animated,
    AsyncStorage,
    config,
    Dimensions,
    Image,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
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
    IsNative,
    LoadPicture
}