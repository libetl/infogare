import {get} from 'axios'
import moment from 'moment'

const sncfApiPrefix = 'https://api.sncf.com/v1/coverage/sncf/'
const stationUrlPrefix = `${sncfApiPrefix}stop_areas/`
const stationUrl = (stationId, dateTime, startPage) => `${stationUrlPrefix}${stationId}/departures?start_page=${startPage}&from_datetime=${dateTime.format('YYYYMMDDTHHmmss')}`
const inverseGeocodingUrl = ({long, lat}) => `${sncfApiPrefix}coords/${long};${lat}/places_nearby?type[]=stop_area`
const vehicleJourneyUrl = (vehicleJourney) => `${sncfApiPrefix}vehicle_journeys/${vehicleJourney}`
const placeUrl = (place) => `${sncfApiPrefix}places?q=${place}`

const defaultEntity = (token) => {return {headers: {Authorization: token || null}}}
const fetch = (url, entity) => entity && entity.headers && entity.headers.Authorization === null ? Promise.resolve() : get(url, entity)

const places = (label, token) => fetch(placeUrl(label), defaultEntity(token))
    .then((result) => Promise.resolve([result.data.places.filter(place => place.embedded_type === 'stop_area').sort((a, b) => b.quality - a.quality)]))

const inverseGeocoding = (coords, token) => fetch(inverseGeocodingUrl(coords), defaultEntity(token))
    .then(result => {
        if (!result) {
            return Promise.resolve([])
        }
        if (!result.data.places_nearby) {
            throw new Error(`Gare non trouvée par géolocalisation inversée {lat:${coords.lat}, long:${coords.long}}`)
        }
        return Promise.resolve(result.data.places_nearby)
    }).catch((error) => {console.log(`${inverseGeocodingUrl(coords)}: ${error}`);throw error})

const baseDepartures = (stationsAreas, token) => token ?
    Promise.all(stationsAreas.apiData.map(row => departures(row.id, 0, token))).then(departuresArrays =>
        departuresArrays.reduce((acc, value) => acc.concat(value), [])) :
    Promise.resolve([{links: [], stop_date_time: '00:00', savedNumber: 1,dataToDisplay: {direction:'Token nécessaire'}}])

const departures = (stationId, page = 0, token) => fetch(stationUrl(stationId, moment().subtract(-1, 'minutes'), page), defaultEntity(token))
    .then(result => Promise.resolve([...result.data.departures]))
    .then(result => result.map(departure => {return {
        links: departure.links,
        stop_date_time: departure.stop_date_time,
        savedNumber: parseInt(departure.display_informations.headsign),
        dataToDisplay: {
            mode: departure.display_informations.commercial_mode,
            direction: departure.display_informations.direction.replace(/ \([^)]+\)$/, ''),
            name: departure.display_informations.code,
            color: departure.display_informations.color,
            number: departure.display_informations.headsign,
            status: departure.display_informations.status,
            time: moment(departure.stop_date_time.departure_date_time, 'YYYYMMDDTHHmmss').format('HH:mm'),
            stops: departure.display_informations.stops || []
        }}})).catch((error) => {console.log(`${stationUrl(stationId, moment(), page)}: ${error}`);Promise.resolve([])})



const vehicleJourney = (closestStations, link, fromCoords, token) => fetch(vehicleJourneyUrl(link), defaultEntity(token))
    .then(result => {
        const allStops = result.data.vehicle_journeys[0].stop_times.map(stop_time => stop_time.stop_point.name)
        const allStopsCoords = result.data.vehicle_journeys[0].stop_times.map(stop_time => { return {
            name:stop_time.stop_point.name,
            geometry:{coordinates:[parseFloat(stop_time.stop_point.coord.lon), parseFloat(stop_time.stop_point.coord.lat)]}}})
        const missionCode = result.data.vehicle_journeys[0].name &&
        result.data.vehicle_journeys[0].name[0] >= 'A' &&  result.data.vehicle_journeys[0].name[0] <= 'Z'
            ? result.data.vehicle_journeys[0].name.substring(0, 4) : undefined
        const foundStationInJourney = closestStations(fromCoords, allStopsCoords)[0].name
        const indexOfStop = allStops.indexOf(foundStationInJourney)
        const stops = allStops.slice(indexOfStop + 1)
        const number = result.data.vehicle_journeys[0].stop_times.find(stopTime => stopTime.headsign).headsign
        return Promise.resolve({
            savedNumber: parseInt(number),
            dataToDisplay: {
                direction: stops[stops.length - 1],
                number: missionCode,
                stops},
            link,
            missionCode,
            departureStation: indexOfStop === 0,
            longMissionCode: result.data.vehicle_journeys[0].name})
    })

const testApi = (token) => fetch(sncfApiPrefix, defaultEntity(token))

const twoClosestJourneys = ({baseDepartures, closestStations, stationsAreas:{stationCoords}, token}) => !token ? Promise.resolve([]) :
    Promise.all(
        baseDepartures.slice(0, 2).map(departure => departure.links &&
            vehicleJourney(closestStations, departure.links.find(link => link.type === 'vehicle_journey').id,
                stationCoords, token)))

const stationSearch = (coords, {token, nestedStationSearch}) => {
    const stationsAreas = nestedStationSearch(coords, {token})
    const {stationCoords, stationName, stations} = stationsAreas['nestedSearchData']
    return inverseGeocoding(stationCoords, token).catch(e => places(stationName, token))
        .then(apiData => {return {apiData, stations, ...stationsAreas, stationCoords, stationName:apiData.length ? apiData[0].stop_area.name : stationsAreas.stationName}})
}

export default {testApi, stationSearch, baseDepartures, feed:[twoClosestJourneys],
    metadata: {features:['stations', 'departures', 'journeys'], everywhere: true,
        ratings:{relevancy: 2, reliability: 5, sustainability: 4, efficiency: 4}}}