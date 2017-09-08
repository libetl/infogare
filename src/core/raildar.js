import {get} from 'axios'
import moment from 'moment'
import {Html5Entities} from 'html-entities'

const gares = ({lat, long}) => get(`http://www.raildar.fr/json/gares?lat=${lat}&lng=${long}&dist=20`).then(response => [response.data[0]])
const departures = (idGare) => get(`http://www.raildar.fr/json/next_missions?id_gare=${idGare}`).then(response => response.data)
const mission = (idMission)   => get(`http://www.raildar.fr/json/get_mission?id_mission=${idMission}`).then(response => response.data)
const train = (idTrain)   => get(`http://www.raildar.fr/json/get_train?id_train=${idTrain}`).then(response => response.data[0])
const normalize = (gare) => gare.departures.filter(departure => departure.terminus !== gare.name_gare).map(departure => {
    const allStops = departure.mission.arrets.map(arret => arret.name_gare)
    const number = parseInt(departure.num)
    const mode = number < 6000 ? 'Intercités' : number < 10000 ? 'TGV' : number < 153000 ? 'Transilien' : 'TER'
    return {
        stop_date_time: {
            base_departure_date_time: moment(departure.time_reel, 'YYYY-MM-DD HH:mm:ssZ').format('YYYYMMDDTHHmmss'),
            departure_date_time: moment(departure.time_reel, 'YYYY-MM-DD HH:mm:ssZ').format('YYYYMMDDTHHmmss'),
        },
        display_informations: {
            commercial_mode: mode,
            direction: departure.terminus,
            code: '',
            color: '#000000',
            headsign: number,
            time: moment(departure.time_reel, 'YYYY-MM-DD HH:mm:ssZ').format('HH:mm'),
            stops: allStops.slice(allStops.indexOf(gare.name_gare) + 1).map(stop => Html5Entities.decode(stop))
        }
    }})

export default {
     gares,
     get: gares => Promise.all(gares.map(async gare => {
        return {...gare, departures:(await (departures(gare.id_gare).then(departures => Promise.all(departures.map(async departure => {
            return {...departure, train:(await train(departure.id_train)), mission:(await mission(departure.id_mission))}})))))}}))
        .then(gares => gares.map(gare => normalize(gare)))
}