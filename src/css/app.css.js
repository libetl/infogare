import { StyleSheet } from '../wrapper.js'

export default StyleSheet.create({
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
    bottomPaddingAfterScrolldown: {
        height: '7.7%',
        width: '100%',
        backgroundColor: '#000000',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    noPlatformYet: {
        color: '#fff',
        width: 0,
        height: 0,
        textAlign: 'center'
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
    yellowBullet: {
        color: '#dfc81f'
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
        width: 72,
        height: 50,
        marginTop: 20,
        paddingLeft: 10,
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
        fontSize: 10
    },
    signIn: {
        backgroundColor: '#ededed',
        height: 60
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#841584',
        minWidth: 25
    },
    buttonText: {
        color: 'white'
    }
})
