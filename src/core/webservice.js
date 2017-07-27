import request from 'axios'
import moment from 'moment'
import {records as stations} from './stations'

const defaultToken = '?-?-?-?-?'

const dateTimeFormat = 'YYYYMMDDThhmmss'
const urlPrefix = 'https://api.sncf.com/v1/coverage/sncf/'
const stationUrlPrefix = `${urlPrefix}stop_areas/`
const stationUrl = (stationId, dateTime, startPage) =>
    `${stationUrlPrefix}${stationId}/departures?start_page=${startPage}&datetime=${dateTime.format(dateTimeFormat)}`
const placeUrl = (place) => `${urlPrefix}places?q=${place}`
const routeUrl = (routeId) => `${urlPrefix}routes/${routeId}/stop_schedules`

const departures = (stationId = 'stop_area:OCE:SA:87391003', page = 0, token = defaultToken) => request({
    method: 'get',
    url: stationUrl(stationId, moment(), page),
    headers: {
        'Authorization': token,
    },
}).then((result) => Promise.resolve([...result.data.departures])).catch((error) => Promise.resolve([]))

const place = (label, token = defaultToken) => request({
    method: 'get',
    url: placeUrl(label),
    headers: {
        'Authorization': token,
    },
}).then((result) => Promise.resolve(result.data.places.filter(place => place.embedded_type === 'stop_area')[0])).catch((error) => Promise.resolve({id:'?'}))

const getStations = () => request({
    method: 'get',
    url: 'https://ressources.data.sncf.com/api/records/1.0/search/?dataset=liste-des-gares&facet=fret&facet=voyageurs&facet=code_ligne&facet=departement&rows=5032'
}).then((result) => Promise.resolve([...result.data.records]))

const route = (departure, from, token = defaultToken) => request({
    method: 'get',
    url: routeUrl(departure.routeId),
    headers: {
        'Authorization': token,
    },
}).then((result) => {
    const allStops = result.data.stop_schedules.map(stop => stop.stop_point.name)
    const stops = allStops.slice(allStops.indexOf(from))
    return Promise.resolve({...departure, stops})
})


const distance = ([lat1, long1], [lat2, long2]) => Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(long2 - long1, 2))
const distanceBetweenStations= (station1, station2) =>
    distance([station1.fields.coordonnees_geographiques[0], station1.fields.coordonnees_geographiques[1]],
        station2.fields.coordonnees_geographiques ? [station2.fields.coordonnees_geographiques[0], station2.fields.coordonnees_geographiques[1]] :
            [-station1.fields.coordonnees_geographiques[0], -station1.fields.coordonnees_geographiques[1]])

const closestStation = (stations, {lat, long}) => stations.reduce((a, b) =>
    distanceBetweenStations({fields:{coordonnees_geographiques:[lat, long]}}, a) < distanceBetweenStations({fields:{coordonnees_geographiques:[lat, long]}}, b) ?
        a : b, stations[0])

const nextDepartures = ({lat, long}) => {
    const stationName = closestStation(stations, {lat, long}).fields.libelle_gare
    return place(stationName).then((station) => departures(station.id))
                             .then((departures) => Promise.resolve(departures.map(e => {return {
                                routeId: e.route.id,
                                mode: e.display_informations.commercial_mode,
                                name: e.display_informations.code,
                                number: e.display_informations.headsign,
                                time: moment(e.stop_date_time.departure_date_time, dateTimeFormat).format('hh:mm'),
                                direction: e.route.direction.name.substring(0, e.route.direction.name.indexOf('('))}})))
                             .then((timetable) => Promise.all(timetable.map(row => route(row, stationName))))
}

export default {nextDepartures}
