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
    scrollView: {
        flexGrow: 1,
        width: '100%'
    },
    rowsContainer: {
        height: '150%'
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
        flexShrink: 1
    },
    modeIcon: {
        width: 30,
        height: 30,
        flexShrink: 1
    },
    number: {
        color: '#fff',
        fontSize: 15,
        width: '20%',
        flexShrink: 1
    },
    time: {
        color: '#dfc81f',
        fontSize: 15,
        fontWeight: 'bold',
        flexShrink: 1
    },
    direction: {
        color: '#fff',
        fontSize: 15,
        overflow: 'hidden',
        width:'45%'
    },
    platform: {
        color: '#fff',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 6,
        width: 30,
        height: 30,
        textAlign: 'center',
        flexShrink: 1
    },
    noPlatformYet: {
        color: '#fff',
        width: 0,
        height: 0,
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
    bottomPaddingAfterScrolldown: {
        width: '100%',
        backgroundColor:'#000000',
        height: 48
    },
    footer: {
        bottom: 0,
        position: 'absolute',
        backgroundColor: '#2c0A3BC0',
        width: '100%',
        height: 48,
        flexDirection: 'row'
    },
    footerFont: {
        color: '#fff',
        flexGrow: 1
    },
    now: {
        backgroundColor: '#04396d',
        width:72,
        height:50,
        marginTop:20,
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
        height: 23
    },
    signIn: {
        backgroundColor: '#ededed',
        height: 60
    }
})
