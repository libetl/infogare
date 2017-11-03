import stations from '../data/stations'
import idfMapping from '../data/idfMapping.json'
import numberToCode from '../data/idfMapping-lines.json'
import codeToLine from '../data/routes-lines.json'
import lineToColor from '../data/routes.json'
import busLinesColors from '../data/ratpBusColors.json'
import metroLinesColors from '../data/metroLinesColors.json'
import rerLinesColors from '../data/rerLinesColors.json'
import tramLinesColors from '../data/tramLinesColors.json'
import transilienLinesColors from '../data/transilienLinesColors.json'

const registeredStations = stations.filter (e => e.fields.tvs)

const distance = ([long1, lat1], [long2, lat2]) => Math.sqrt(Math.pow(long2 - long1, 2) + Math.pow(lat2 - lat1, 2))
const distanceBetween= (station1, station2) =>
    distance([station1.geometry.coordinates[1], station1.geometry.coordinates[0]],
        station2.geometry ? [station2.geometry.coordinates[1], station2.geometry.coordinates[0]] :
            [-station1.geometry.coordinates[1], -station1.geometry.coordinates[0]])

const closestStations = ({long, lat}, stationsList = registeredStations) => {
    const thisPoint =  {geometry:{coordinates:[long, lat]}}
    const closestStation = stationsList.reduce((a, b) =>
        distanceBetween(thisPoint, a) < distanceBetween(thisPoint, b) ? a : b, stationsList[0])
    return stationsList.filter(station =>
        station.geometry.coordinates[0] === closestStation.geometry.coordinates[0] &&
        station.geometry.coordinates[1] === closestStation.geometry.coordinates[1])
}

const stationsMatching = (text, stationsList = registeredStations) => text.length < 1 ? [] :
    stationsList.filter(station => station.fields.intitule_gare.toLowerCase().includes(text.toLowerCase()))

const findIdfMapping = ({baseDepartures}) => baseDepartures.map(departure => findOneIdfMapping(departure))
const findOneIdfMapping = departure => {return {savedNumber:departure.savedNumber,
    dataToDisplay:{number:idfMapping[departure.savedNumber] || departure.dataToDisplay.number}}}

const findColor = ({baseDepartures}) => baseDepartures.map(departure =>
    departure.dataToDisplay.color || !lineToColor[codeToLine[numberToCode[departure.savedNumber]]] ? {} :
    {savedNumber:departure.savedNumber, dataToDisplay:{color: lineToColor[codeToLine[numberToCode[departure.savedNumber]]]}})

const busColors = ({baseDepartures}) => baseDepartures.map(departure =>
    (departure.dataToDisplay.mode||'').toLowerCase() !== 'bus' || departure.brand !== 'RATP' ||
    !busLinesColors[departure.dataToDisplay.number] ? {savedNumber:departure.savedNumber, dataToDisplay:{fontColor:'FFFFFF'}} :
    {savedNumber:departure.savedNumber, dataToDisplay:{
        color: busLinesColors[departure.dataToDisplay.number].backgroundColor, fontColor:busLinesColors[departure.dataToDisplay.number].color}})

const metroColors = ({baseDepartures}) => baseDepartures.map(departure =>
    (departure.dataToDisplay.mode||'').toLowerCase() !== 'metro' ||
    !metroLinesColors[departure.dataToDisplay.number] ? {} :
        {savedNumber:departure.savedNumber, dataToDisplay:{
            name: departure.dataToDisplay.number,
            color: metroLinesColors[departure.dataToDisplay.number]}})

const transilienColors = ({baseDepartures}) => baseDepartures.map(departure => {
    if ((departure.dataToDisplay.mode || '').toLowerCase() !== 'transilien') return {}
    if (transilienLinesColors[departure.dataToDisplay.name||'-1']) {
        return {
            savedNumber: departure.savedNumber, dataToDisplay: {
                color: transilienLinesColors[departure.dataToDisplay.name]
            }
        }
    }
    if (transilienLinesColors[departure.dataToDisplay.number||'-1']){
        return {
            savedNumber: departure.savedNumber, dataToDisplay: {
                name: departure.dataToDisplay.number,
                color: transilienLinesColors[departure.dataToDisplay.number]
            }
        }
    }
    const fromTrainNumber = findOneIdfMapping(departure)
    if (lineToColor[codeToLine[numberToCode[fromTrainNumber.savedNumber]]])
        return {
            savedNumber: departure.savedNumber, dataToDisplay: {
                color: lineToColor[codeToLine[numberToCode[fromTrainNumber.savedNumber]]]
            }
        }
    return {}
})

const rerColors = ({baseDepartures}) => baseDepartures.map(departure => {
    if ((departure.dataToDisplay.mode || '').toLowerCase() !== 'rer') return {}
    if (rerLinesColors[departure.dataToDisplay.name||'-1'])
        return {
            savedNumber: departure.savedNumber, dataToDisplay: {
                color: rerLinesColors[departure.dataToDisplay.name]
            }
        }
    if (rerLinesColors[departure.dataToDisplay.number||'-1'])
        return {
            savedNumber: departure.savedNumber, dataToDisplay: {
                name: departure.dataToDisplay.number,
                color: rerLinesColors[departure.dataToDisplay.number]
            }
        }
    const fromTrainNumber = findOneIdfMapping(departure)
    if (lineToColor[codeToLine[numberToCode[fromTrainNumber.savedNumber]]])
    return {
        savedNumber: departure.savedNumber, dataToDisplay: {
            color: lineToColor[codeToLine[numberToCode[fromTrainNumber.savedNumber]]]
        }
    }
    return {}
})

const tramColors = ({baseDepartures}) => baseDepartures.map(departure =>
    (departure.dataToDisplay.mode||'').toLowerCase() !== 'tramway' ||
    !tramLinesColors[departure.dataToDisplay.number.replace(/T/i,'')] ? {} :
        {savedNumber:departure.savedNumber, dataToDisplay:{
            number: departure.dataToDisplay.number.replace(/T/i,''),
            name: departure.dataToDisplay.number.replace(/T/i,''),
            color: tramLinesColors[departure.dataToDisplay.number.replace(/T/i,'')]}})

const findName = ({baseDepartures}) => baseDepartures.map(departure =>
    departure.dataToDisplay.name || !codeToLine[numberToCode[departure.savedNumber]] ? {} :
    {savedNumber:departure.savedNumber, dataToDisplay:{name: codeToLine[numberToCode[departure.savedNumber]]}})

const stationSearch = coords => {
    const foundStations = closestStations(coords)
    const stationName = foundStations[0].fields.intitule_gare
    const stationCoords = {long: foundStations[0].geometry.coordinates[0], lat: foundStations[0].geometry.coordinates[1]}
    return {stationName, stationCoords, stations:foundStations,
        iataCodes: foundStations.map(station => (station.fields.tvs || '').split('|')[0]),
        nestedSearchData:{stations:foundStations, stationName, stationCoords}}}

export default { stationSearch, stationsMatching,
    feed:[findIdfMapping, busColors, findColor, metroColors, transilienColors, tramColors, rerColors, findName],
    closestStations,
    metadata: {features:['stations', 'colors', 'codes'], everywhere: true,
    ratings:{relevancy: 2, reliability: 5, sustainability: 5}}}
