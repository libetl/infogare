import stations from './stations'
import idfMapping from './idfMapping.json'

const registeredStations = stations.filter (e => e.fields.tvs)

const distance = ([long1, lat1], [long2, lat2]) => Math.sqrt(Math.pow(long2 - long1, 2) + Math.pow(lat2 - lat1, 2))
const distanceBetween= (station1, station2) =>
    distance([station1.geometry.coordinates[1], station1.geometry.coordinates[0]],
        station2.geometry ? [station2.geometry.coordinates[1], station2.geometry.coordinates[0]] :
            [-station1.geometry.coordinates[1], -station1.geometry.coordinates[0]])


export default {
    idfMapping,
    closestStations: ({long, lat}) => {
        const thisPoint =  {geometry:{coordinates:[long, lat]}}
        const closestStation = registeredStations.reduce((a, b) =>
            distanceBetween(thisPoint, a) < distanceBetween(thisPoint, b) ? a : b, registeredStations[0])
        return registeredStations.filter(station =>
            station.geometry.coordinates[0] === closestStation.geometry.coordinates[0] &&
            station.geometry.coordinates[1] === closestStation.geometry.coordinates[1])
    }
}
