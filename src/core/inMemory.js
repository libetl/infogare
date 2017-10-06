import stations from './stations'
import idfMapping from './idfMapping.json'

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

const findIdfMapping = ({baseDepartures}) => baseDepartures.map(departure => {return {savedNumber:departure.savedNumber,
    dataToDisplay:{number:idfMapping[departure.savedNumber] || departure.dataToDisplay.number}}})

export default { stationsMatching, feed:[findIdfMapping], closestStations }
