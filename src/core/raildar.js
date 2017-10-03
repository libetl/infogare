import {get} from 'axios'
import moment from 'moment'
import {Html5Entities} from 'html-entities'
import haversine from './haversine'

const gares = ({lat, long}) => get(`http://www.raildar.fr/json/gares?lat=${lat}&lng=${long}&dist=20`).then(response => [{...response.data[0], name_gare: Html5Entities.decode(response.data[0].name_gare)}])
const departures = (idGare) => get(`http://www.raildar.fr/json/next_missions?id_gare=${idGare}`).then(response => response.data)
const mission = (idMission) => get(`http://www.raildar.fr/json/get_mission?id_mission=${idMission}`).then(response => response.data)
const train = (idTrain) => get(`http://www.raildar.fr/json/get_train?id_train=${idTrain}`).then(response => response.data[0])
const trafic = ({lat, long}) => get(`http://raildar.fr/json/get_circulation?id_source=2&zoom=17&lat=${lat}&lng=${long}&bbox=${lat - 2},${long - 2},${lat + 2},${long + 2}`).then(response => response.data.features || [])

const normalize = (gare) => gare.departures.filter(departure => departure.terminus !== gare.name_gare).map(departure => {
    const allStops = departure.mission.arrets.map(arret => arret.name_gare)
    const number = parseInt(departure.num)
    const radar = gare.trafic.find(train => train.properties.id_train === departure.id_train)
    const trainCoords = radar && radar.geometry.coordinates
    const mode = number < 6000 ? 'Intercités' : number < 10000 ? 'TGV' : number < 153000 ? 'Transilien' : 'TER'
    const now = moment().add({minutes:-10}).format('HH:mm')
    const heure = moment(departure.time_reel, 'YYYY-MM-DD HH:mm:ssZ').format('HH:mm')
    return {
        links: departure.links,
        stop_date_time: {
            base_departure_date_time: heure.localeCompare(now) < 0 ? `${parseInt(heure.split(':')[0]) + 24}:${heure.split(':')[1]}` : heure,
            departure_date_time: moment(departure.time_reel, 'YYYY-MM-DD HH:mm:ssZ').format('YYYYMMDDTHHmmss')
        },
        dataToDisplay: {
            mode: mode,
            direction: Html5Entities.decode(departure.terminus),
            name: '',
            color: '#000000',
            number: number,
            status: radar && `< ${Math.ceil(haversine({lat: gare.lat, long: gare.lng}, {lat: trainCoords[1], long: trainCoords[0]}))}km`,
            time: moment(departure.time_reel, 'YYYY-MM-DD HH:mm:ssZ').format('HH:mm'),
            stops: allStops.slice(allStops.indexOf(gare.name_gare) + 1).map(stop =>
                Html5Entities.decode(stop).replace(/ /g, '\u00a0').replace(/-/g, '\u2011').replace(/\//g, '\u00a0\u00a0\u00a0\u0338'))
        }}})

export default {
    gares,
    get: gares => Promise.all(gares.map(async gare => {
        return {...gare, trafic: (await trafic({lat: gare.lat, long: gare.lng})),
            departures:(await (departures(gare.id_gare).then(departures => Promise.all(departures.map(async departure => {
                return {...departure, train:(await train(departure.id_train)), mission:(await mission(departure.id_mission))}})))))}}))
        .then(gares => gares.map(gare => normalize(gare)))
}