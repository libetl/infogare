import React from 'react'
import moment from 'moment'
import {Button, Image, Modal, ScrollView, StyleSheet, Text, View, LoadPicture} from '../wrapper'

const styles = StyleSheet.create({
    "View": {
    },
    "Text": {
        "fontFamily": "achemine"
    },
    "screen": {
        "backgroundColor": "#f4ecf4",
        "display": "flex",
        "flexDirection": "column",
        "flexWrap": "nowrap",
        "height": "100%",
        "width": "100%"
    },
    "journey": {
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": "nowrap",
        "height": "67.33%",
        "width": "100%"
    },
    "punctuality": {
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": "wrap",
        "marginLeft": "3.67%"
    },
    "train": {
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": "wrap",
        "marginTop": "0.5%",
        "marginLeft": "3.67%"
    },
    "description": {
        "height": "100%",
        "width": "34.75%"
    },
    "finalBullet": {
        "color": "#ffec00",
        "backgroundColor": "#6969AF",
        "textAlign": "center",
        "paddingLeft" : 2
    },
    "bulletPadding": {
        "minWidth": "3.2%",
        "color": "#6969AF",
        "backgroundColor": "#6969AF",
        "alignSelf": "flex-start"
    },
    "bullet": {
        "minWidth": "3.2%",
        "color": "#ffec00",
        "backgroundColor": "#6969AF",
        "alignSelf": "flex-start",
        "textAlign": "center"
    },
    "stops": {
        "height": "100%",
        "paddingLeft": "2.8%",
        "flexGrow": 1,
        "backgroundColor": "#004494"
    },
    "stop": {
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": "wrap",
        "marginTop": "-1.5%"
    },
    "finalStop": {
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": "wrap",
        "alignSelf" : "flex-start",
        "paddingRight" : 5,
        "backgroundColor": "#6969AF",
        "borderStyle": "solid",
        "borderWidth": 2,
        "borderColor": "#6969AF",
        "borderRadius": 8
    },
    "stopText": {
        "color": "#FFFFFF",
        "alignSelf": "flex-end",
        "marginLeft": "2.5%"
    },
    "finalStopText": {
        "color": "#FFFFFF",
        "fontWeight": "bold",
        "paddingLeft": 10
    },
    "stopTopPadding": {
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": "wrap",
        "marginBottom": "-5%"
    },
    "beforeFinalStopPadding": {
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": "wrap",
        "marginBottom": "-6.1%"
    },
    "brand": {
        "height":"20%",
        "width":"20%",
        "marginLeft": "3.66%",
        "marginBottom": "0%",
        "marginRight": "3.66%",
        "marginTop": "3.66%"
    },
    "logo": {
        "height": "100%",
        "width": "100%",
        "minWidth": 60
    },
    "front": {
        "minWidth": 30,
        "display": "flex",
        "flexDirection": "column",
        "flexWrap": "wrap",
        "width": "7.2%"
    },
    "rear": {
        "display": "flex",
        "flexDirection": "column",
        "flexWrap": "wrap",
        "width": "7.2%"
    },
    "carriageFront": {
        "flexGrow": 1,
        "height": "20%",
        "width": "100%",
        "transform" : [{"scaleX": -1}]
    },
    "carriageRear": {
        "flexGrow": 1,
        "height": "20%",
        "width": "100%",
        "minWidth": 40
    },
    "time": {
        "fontSize": 35,
        "fontWeight": "bold",
        "color": "#004494"
    },
    "status": {
        "marginLeft": "15%",
        "alignSelf": "flex-end"
    },
    "ontime": {
        "fontSize": 15,
        "fontWeight": "bold",
        "color": "#004494"
    },
    "direction": {
        "marginTop": "4%",
        "marginLeft": "3.67%"
    },
    "mode": {
        "color": "#193479",
        "fontSize": 19,
        "fontWeight": "normal"
    },
    "modeIcon": {
        "height": 30,
        "width": 30
    },
    "number": {
        "marginLeft": "6%",
        "alignSelf": "flex-end"
    },
    "numberText": {
        "color": "#6969AF",
        "fontSize": 17,
        "fontWeight": "normal"
    },
    "type": {
        "opacity": 0.2,
        "position": "absolute",
        "zIndex": -1,
        "bottom": "52.66%",
        "left": "-32%",
        "width": 240,
        "transform": [{ "rotate": "270deg"}]
    },
    "typeText": {
        "color": "#6969AF",
        "fontSize": 74,
    },
    "composition": {
        "display": "flex",
        "flexDirection": "column",
        "flexWrap": "nowrap",
        "backgroundColor": "#51134B",
        "flexGrow": 1,
        "width": "100%",
        "height": "32.67%"
    },
    "platform": {
        "width": "10%"
    },
    "platformTitle": {
        "backgroundColor": "white",
        "borderStyle": "solid",
        "borderWidth": 2,
        "borderColor": "#51134B",
        "borderRadius": 7,
        "marginLeft": "15%",
        "height":20,
        "width": "28%",
        "minWidth": 37
    },
    "platformTitleText": {
        "color": "#51134B"
    },
    "platformValue": {
        "marginTop": "-10%",
        "paddingLeft": "40%"
    },
    "platformValueText": {
        "color": "white",
        "textDecorationLine" : "underline",
        "textDecorationStyle": "solid"
    },
    "schema": {
        "marginTop": 5,
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": "wrap",
        "marginBottom": "-5%"
    },
    "destination": {
        "width": "100%",
        "flexGrow": 1
    },
    "destinationText": {
        "textAlign": "center",
        "color": "#FFEC00",
        "fontSize": 16,
        "fontWeight": "bold",
    },
    "destinationParent": {
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": "wrap",
        "width": "75.5%"
    },
    "ground": {
        "paddingBottom": "5%",
        "minHeight": 50,
        "borderStyle": "dotted",
        "borderBottomWidth": 1,
        "borderBottomColor": "#FFEC00",
        "flexGrow": 1
    },
    "carriagesList": {
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": "wrap",
        "height": 50
    },
    "carriageNumber": {
        "flexShrink": 1,
        "fontSize": 18,
        "fontWeight": "bold",
        "color": "white"
    },
    "carriage": {
        "minWidth": 30,
        "display": "flex",
        "flexDirection": "column",
        "flexWrap": "wrap",
        "width": "7.2%"
    },
    "carriageDrawing": {
        "backgroundColor": "#d3b0da",
        "width": "92%",
        "flexGrow": 1
    },
    "trainDrawing": {
        "width": "100%"
    },
    "landmarks": {
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": "wrap",
        "width": "100%",
        "height": "15%",
        "overflow": "hidden",
        "marginLeft" : "15%",
        "marginBottom" : "-15%"
    },
    "landmark": {
        "width": "2%",
        "backgroundColor": "#003a79",
        "borderStyle": "solid",
        "borderWidth": 2,
        "borderColor": "white",
        "borderRadius": 5,
        "minWidth": 20,
        "minHeight": 25
    },
    "landmarkText": {
        "padding" : 5,
        "fontSize": 12,
        "color": "white",
        "fontWeight": "bold"
    },
    "landmarkR": {
        "marginLeft": "26%"
    },
    "landmarkSl": {
        "marginLeft": "6%"
    },
    "landmarkT": {
        "marginLeft": "5%"
    },
    "landmarkU": {
        "marginLeft": "5.5%"
    },
    "landmarkV": {
        "marginLeft": "9%"
    },
    "landmarkW": {
        "marginLeft": "3%"
    },
    "landmarkX": {
        "marginLeft": "1%"
    },
    "landmarkY": {
        "marginLeft": "2%"
    },
    "landmarkZ": {
        "marginLeft": "2%"
    },
    "statusbar": {
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": "wrap",
        "flexShrink": 1,
        "height":"1%",
        "minHeight": 40,
        "alignSelf": "flex-end",
        "marginTop": -5,
    },
    "info": {
        "flexGrow": 1,
        "height": 30,
        "alignSelf": "flex-end",
        "width":"1%"
    },
    "infoText": {
        "fontSize": 23,
        "fontStyle": "italic",
        "color": "white"
    },
    "now": {
        "flexShrink": 1,
        "height": 35,
        "width": "10%",
        "minWidth" : 80,
        "alignSelf": "flex-end",
        "marginRight": "2%",
        "backgroundColor": "#003a79",
        "borderStyle": "solid",
        "borderWidth": 2,
        "borderColor": "white",
        "borderBottomColor": "#003a79",
        "borderBottomWidth": 0,
        "borderRadius": 10
    },
    "hhmmss": {
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": "wrap",
    },
    "hour": {
        "paddingTop": "5%",
        "paddingLeft": "5%",
        "fontSize": 18,
        "fontWeight": "bold",
        "marginRight": "5%",
        "color": "white"
    },
    "minutes": {
        "paddingTop": "5%",
        "paddingLeft": "5%",
        "fontSize": 18,
        "fontWeight": "bold",
        "marginRight": "5%",
        "color": "white"
    },
    "seconds": {
        "marginTop": "5%",
        "paddingTop": "5%",
        "fontSize": 14,
        "fontWeight": "bold",
        "color": "#f5a665"
    },
    "leaveThisPlatform" : {
        "position": "absolute",
        "top": 5,
        "right" : 5
    }})

export default class Details extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const details = this.props.details || {}
        const mode = (details.mode || '').toLowerCase()
        const directionName = details.direction || ' '
        const stops = details.stops || [{}]
        const finalStop = typeof stops.slice(-1)[0] === 'object' ? '?' : stops.slice(-1)[0]
        return (
            <Modal style={{zIndex: 2, width: '100%', height: '100%', display: this.props.details !== undefined ? 'block' : 'none'}} animationType={"slide"} visible={this.props.details !== undefined} onRequestClose={this.props.onClose} contentLabel="Details">
                <View style={styles.screen}>
                    <View style={styles.journey}>
                        <View style={styles.description}>
                            <View style={styles.type}><Text style={styles.typeText}>départ</Text></View>
                            <View style={styles.brand}><Image style={styles.logo} source={LoadPicture('logo')} /></View>
                            <View style={styles.punctuality}>
                                <View><Text style={styles.time}>{(details.time || '').replace(':', 'h')}</Text></View>
                                <View style={styles.status}><Text style={styles.ontime}>{details.status || `à l'heure`}</Text></View>
                            </View>
                            <View style={styles.direction}><Text style={{fontSize : this.props.rowWidth / (directionName.length * 1.76), fontWeight: "bold", color: "#004494"}}>{directionName}</Text></View>
                            <View style={styles.train}>
                                <View>{mode === 'transilien' ? <Image style={styles.modeIcon} source={LoadPicture('transilienB')} /> :
                                    mode === 'rer' ? <Image style={styles.modeIcon} source={LoadPicture('rerB')} /> :
                                        mode === 'intercités' ? <Image style={styles.modeIcon} source={LoadPicture('intercitesB')}/> :
                                            mode === 'intercités de nuit' ? <Image style={styles.modeIcon} source={LoadPicture('intercitesB')} /> :
                                                <Text style={styles.mode}>{mode.toUpperCase()}</Text>}</View>
                                <View style={styles.number}>
                                    {!details.name ? <Text style={{'display': 'none'}}/> :
                                    <Text style={{fontWeight: 'bold', borderStyle: 'solid', borderWidth: 3, borderRadius: mode === 'rer' ? 30 : 3,
                                        borderColor: `#${details.color || '#000000'}`, color:`#${details.color || '#000000'}`, textAlign: 'center',height: 30,
                                        width: 30}}>{details.name}</Text>}
                                    <Text style={styles.numberText}>{details.number}</Text></View>
                            </View>
                        </View>
                        <ScrollView style={styles.stops}>
                            <View style={styles.stopTopPadding}><Text style={styles.bulletPadding}>&#x25CF;</Text><Text style={styles.stopText}/></View>
                            {stops.slice(0, -1).map((stop, num) => (<View key={num} style={styles.stop}><Text style={styles.bullet}>&#x25CF;</Text><Text style={styles.stopText}>{stop}</Text></View>))}
                            <View style={styles.beforeFinalStopPadding}><Text style={styles.bulletPadding}>&#x25CF;</Text><Text style={styles.stopText}/></View>
                            <View style={styles.finalStop}><Text style={styles.finalBullet}>&#x25CF;</Text><Text style={styles.finalStopText}>&nbsp;&nbsp;{finalStop}</Text></View>
                        </ScrollView>
                    </View>
                    <View style={styles.composition}>
                        <View style={styles.schema}>
                            {details.platform ? (<View style={styles.platform}>
                                <View style={styles.platformTitle}>
                                    <Text style={styles.platformTitleText}>Voie</Text>
                                </View>
                                <View style={styles.platformValue}>
                                    <Text style={styles.platformValueText}>&nbsp;{details.platform}&nbsp;</Text>
                                </View>
                            </View>) : <View style={styles.platform}/>}
                            <View style={styles.destinationParent}>
                                <View style={styles.destination}>
                                    <Text style={styles.destinationText}>{details.direction}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.ground}>
                            <View style={styles.trainDrawing}>
                                <View style={styles.carriagesList}>
                                    <View style={styles.front}><Text style={styles.carriageNumber}>&nbsp;</Text><Image style={styles.carriageFront} source={LoadPicture('rear')}/></View>
                                    <View style={styles.carriage}><Text style={styles.carriageNumber}>18</Text><View style={styles.carriageDrawing}/></View>
                                    <View style={styles.carriage}><Text style={styles.carriageNumber}>17</Text><View style={styles.carriageDrawing}/></View>
                                    <View style={styles.carriage}><Text style={styles.carriageNumber}>16</Text><View style={styles.carriageDrawing}/></View>
                                    <View style={styles.carriage}><Text style={styles.carriageNumber}>15</Text><View style={styles.carriageDrawing}/></View>
                                    <View style={styles.carriage}><Text style={styles.carriageNumber}>14</Text><View style={styles.carriageDrawing}/></View>
                                    <View style={styles.carriage}><Text style={styles.carriageNumber}>13</Text><View style={styles.carriageDrawing}/></View>
                                    <View style={styles.carriage}><Text style={styles.carriageNumber}>12</Text><View style={styles.carriageDrawing}/></View>
                                    <View style={styles.carriage}><Text style={styles.carriageNumber}>11</Text><View style={styles.carriageDrawing}/></View>
                                    <View style={styles.rear}><Text style={styles.carriageNumber}>&nbsp;</Text><Image style={styles.carriageRear} source={LoadPicture('rear')}/></View>
                                </View>
                            </View>
                            <View style={styles.landmarks}>
                                <View style={styles.landmark}><Text style={styles.landmarkText}>R</Text></View>
                                <View style={styles.landmark}><Text style={styles.landmarkText}>S</Text></View>
                                <View style={styles.landmark}><Text style={styles.landmarkText}>T</Text></View>
                                <View style={styles.landmark}><Text style={styles.landmarkText}>U</Text></View>
                                <View style={styles.landmark}><Text style={styles.landmarkText}>V</Text></View>
                                <View style={styles.landmark}><Text style={styles.landmarkText}>W</Text></View>
                                <View style={styles.landmark}><Text style={styles.landmarkText}>X</Text></View>
                                <View style={styles.landmark}><Text style={styles.landmarkText}>Y</Text></View>
                                <View style={styles.landmark}><Text style={styles.landmarkText}>Z</Text></View>
                            </View>
                        </View>
                        <View style={styles.statusbar}>
                            <ScrollView style={styles.info} horizontal={true}><Text style={styles.infoText}>{'L\'accès au train ne peut être garanti 2 minutes avant le départ.'.toUpperCase()}</Text></ScrollView>
                            <View style={styles.now}>
                                <View style={styles.hhmmss}>
                                    <Text style={styles.hour}>{this.props.displayNowColon ? moment().format('HH:mm') : moment().format('HH mm')}</Text><Text style={styles.seconds}>{moment().format('ss')}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.leaveThisPlatform}>
                    <Button onPress={this.props.onClose} title='☓' color='#841584' accessibilityLabel='Quitter ce quai'/>
                </View>
            </Modal>
        )
    }
}