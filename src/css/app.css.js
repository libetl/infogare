import {StyleSheet} from 'react-native'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
    },
    bigodd: {
        height: '20%',
        width: '100%',
        backgroundColor: '#0d5da6',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    bigeven: {
        height: '20%',
        width: '100%',
        backgroundColor: '#04396d',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    odd: {
        height: '10%',
        width: '100%',
        backgroundColor: '#0d5da6',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    even: {
        height: '10%',
        width: '100%',
        backgroundColor: '#04396d',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    mode: {
        color: '#fff',
        fontSize: 15,
        width: '10%'
    },
    modeIcon: {
        width: 30,
        height: 30
    },
    number: {
        color: '#fff',
        fontSize: 15,
        width: '20%'
    },
    time: {
        color: '#dfc81f',
        fontSize: 15,
        fontWeight: 'bold',
        width: '15%'
    },
    direction: {
        color: '#fff',
        fontSize: 15,
        overflow: 'hidden',
        width: '45%'
    },
    platform: {
        position: 'absolute',
        right: 5,
        color: '#fff',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 6,
        width: '10%',
        height: 25,
        textAlign: 'center'
    },
    noPlatformYet: {
        color: '#fff',
        borderRadius: 6,
        width: '10%',
        height: 25,
        textAlign: 'center'
    },
    split: {
        marginBottom: -25,
        height: '100%',
        width: '100%',
        flexDirection: 'row'
    },
    dontsplit: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    scroll: {
        height: 20
    },
    stops: {
        paddingTop: 0,
        paddingBottom: 0,
        width: '100%',
        flexDirection: 'row',
        overflow: 'hidden'
    },
    oneStop: {
        color: '#fff',
        fontSize: 20,
        lineHeight: 35
    },
    yellowBullet: {
        color: '#dfc81f'
    },
    footer: {
        backgroundColor: '#2c0A3B',
        width: '100%',
        height: '10%',
        flexDirection: 'row'
    },
    footerFont: {
        color: '#fff',
        flexGrow: 1
    },
    now: {
        backgroundColor: '#04396d',
        width:72,
        height:30,
        marginTop:8,
        paddingLeft:10,
        paddingTop: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 6,
        position: 'absolute',
        right: 5
    },
    hoursMinutes: {
        color: '#fff'
    },
    seconds: {
        color: '#dfc81f',
        fontSize:10
    },
    statusbar: {
        height: 48
    },
    signIn: {
        backgroundColor: '#ededed',
        height: 60
    }
})
