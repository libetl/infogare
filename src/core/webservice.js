import {get} from 'axios'
import moment from 'moment'
import stations from './stations'
import idfMapping from './idfMapping'

const dateTimeFormat = 'YYYYMMDDTHHmmss'
const sncfApiPrefix = 'https://api.sncf.com/v1/coverage/sncf/'
const stationUrlPrefix = `${sncfApiPrefix}stop_areas/`
const updating = '(mise à jour...)'
const registeredStations = stations.filter (e => e.fields.tvs)
const garesSncfDeparturesUrl = (tvs) => `https://www.gares-sncf.com/fr/train-times/${tvs.toUpperCase()}/departure`
const stationUrl = (stationId, dateTime, startPage) => `${stationUrlPrefix}${stationId}/departures?start_page=${startPage}&from_datetime=${dateTime.format(dateTimeFormat)}`
const inverseGeocodingUrl = ({long, lat}) => `${sncfApiPrefix}coords/${long};${lat}/places_nearby?type[]=stop_area`
const vehicleJourneyUrl = (vehicleJourney) => `${sncfApiPrefix}vehicle_journeys/${vehicleJourney}`
const placeUrl = (place) => `${sncfApiPrefix}places?q=${place}`
const defaultEntity = (token) => {return {headers: {Authorization: token || null}}}

const fetch = (url, entity) => entity && entity.headers && entity.headers.Authorization === null ? Promise.resolve() : get(url, entity)
const places = (label, token) => fetch(placeUrl(label), defaultEntity(token))
    .then((result) => Promise.resolve([result.data.places.filter(place => place.embedded_type === 'stop_area').sort((a, b) => b.quality - a.quality)]))

const inverseGeocoding = (coords, token) => fetch(inverseGeocodingUrl(coords), defaultEntity(token))
    .then((result) => {
        if (!result) {
            return Promise.resolve([])
        }
        if (!result.data.places_nearby) {
            throw new Error(`Gare non trouvée par géolocalisation inversée {lat:${coords.lat}, long:${coords.long}}`)
        }
        return Promise.resolve(result.data.places_nearby)
    }).catch((error) => {console.log(`${inverseGeocodingUrl(coords)}: ${error}`);throw error})

const departures = (stationId, page = 0, token) => fetch(stationUrl(stationId, moment(), page), defaultEntity(token))
    .then((result) => Promise.resolve([...result.data.departures]))
    .catch((error) => {console.log(`${stationUrl(stationId, moment(), page)}: ${error}`);Promise.resolve([])})

const getGaresSncfDepartures = (tvs) => fetch(garesSncfDeparturesUrl(tvs))
    .then((result) => {
        if (!Array.isArray(result.data.trains)) {
            return Promise.resolve({})
        }
        return Promise.resolve(result.data.trains)
    })

const vehicleJourney = (link, fromCoords, token) => fetch(vehicleJourneyUrl(link), defaultEntity(token))
    .then((result) => {
    const allStops = result.data.vehicle_journeys[0].stop_times.map(
        stop_time => stop_time.stop_point.name.replace(/ /g, '\u00a0').replace(/-/g, '\u2011').replace(/\//g, '\u00a0\u00a0\u00a0\u0338'))
    const allStopsCoords = result.data.vehicle_journeys[0].stop_times.map(stop_time => { return {
        name:stop_time.stop_point.name.replace(/ /g, '\u00a0').replace(/-/g, '\u2011').replace(/\//g, '\u00a0\u00a0\u00a0\u0338'),
        geometry:{coordinates:[parseFloat(stop_time.stop_point.coord.lon), parseFloat(stop_time.stop_point.coord.lat)]}}})
    const missionCode = result.data.vehicle_journeys[0].name &&
    result.data.vehicle_journeys[0].name[0] >= 'A' &&  result.data.vehicle_journeys[0].name[0] <= 'Z'
        ? result.data.vehicle_journeys[0].name.substring(0, 4) : undefined
    const foundStationInJourney = closestStations(allStopsCoords, {lat: fromCoords[1], long: fromCoords[0]})[0].name
    const indexOfStop = allStops.indexOf(foundStationInJourney)
    const stops = allStops.slice(indexOfStop + 1)
    return Promise.resolve({link, stops, missionCode})
})

const distance = ([long1, lat1], [long2, lat2]) => Math.sqrt(Math.pow(long2 - long1, 2) + Math.pow(lat2 - lat1, 2))
const distanceBetween= (station1, station2) =>
    distance([station1.geometry.coordinates[1], station1.geometry.coordinates[0]],
        station2.geometry ? [station2.geometry.coordinates[1], station2.geometry.coordinates[0]] :
            [-station1.geometry.coordinates[1], -station1.geometry.coordinates[0]])

const closestStations = (theStations, {long, lat}) => {
    const thisPoint =  {geometry:{coordinates:[long, lat]}}
    const closestStation = theStations.reduce((a, b) =>
        distanceBetween(thisPoint, a) < distanceBetween(thisPoint, b) ? a : b, theStations[0])
    return theStations.filter(station =>
        station.geometry.coordinates[0] === closestStation.geometry.coordinates[0] &&
        station.geometry.coordinates[1] === closestStation.geometry.coordinates[1])
}

const sortedByDateTime = (departuresData) => [].concat.apply([], departuresData).sort((d1, d2) =>
    d1.stop_date_time.base_departure_date_time.localeCompare(d2.stop_date_time.base_departure_date_time))
const flatten = (array) => array.reduce((a, b) => a.concat(b), []).filter(x => x)

export default {
    test: (token) => fetch(sncfApiPrefix, defaultEntity(token)),
    nextDepartures: async ({long, lat}, token, notify = () => {}) => {
        const stations = closestStations(registeredStations, {long, lat})
        const stationName = stations[0].fields.intitule_gare
        const stationCoords = {long: stations[0].geometry.coordinates[0], lat: stations[0].geometry.coordinates[1]}

        notify({timetable:{station: `${stationName}\n${updating}`, departures: new Array(10).fill({})}})

        const stationsAreas = await inverseGeocoding(stationCoords, token).catch(e => places(stationName, token))
        const openDataDepartures = await Promise.all(stationsAreas.map(stationArea => departures(stationArea.id, 0, token)))
        const departuresV1 = sortedByDateTime(flatten(openDataDepartures)).map(departure => {
            return {
                links: departure.links,
                departureData: {
                    mode: departure.display_informations.commercial_mode,
                    direction: departure.display_informations.direction.replace(/ \([^)]+\)$/, ''),
                    name: departure.display_informations.code,
                    color: departure.display_informations.color,
                    number: departure.display_informations.headsign,
                    time: moment(departure.stop_date_time.departure_date_time, dateTimeFormat).format('HH:mm')
                }
            }
        })

        notify({timetable:{station: `${stationName}\n${updating}`, departures: departuresV1.map(x => x.departureData)}})

        const iataCodes = stations.map(station => (station.fields.tvs || '').split('|')[0])
        const garesSncfDepartures = await Promise.all(iataCodes.map(iataCode => getGaresSncfDepartures(iataCode)))
        const allPlatformsDepartures = flatten(garesSncfDepartures)

        const departuresV2 = departuresV1.length > 0 ? departuresV1.map(departure => {
            return {
                ...departure,
                departureData: {
                    ...departure.departureData,
                    number: idfMapping[departure.departureData.number] || departure.departureData.number,
                    platform: (allPlatformsDepartures.find(x => x.num === departure.departureData.number) || {voie: ''}).voie
                }
            }
        }) : allPlatformsDepartures.map(departure => {
            return {
                departureData: {
                    mode: departure.type.split(' ')[0],
                    direction: departure.origdest,
                    name: departure.type.includes(' ') ? departure.type.split(' ')[1] : '',
                    color: '000000',
                    number: departure.num,
                    time: departure.heure,
                    platform: departure.voie,
                    stops: []
                }
            }
        })

        notify({timetable:{station: `${stationName}\n${updating}`, departures: departuresV2.map(x => x.departureData)}})

        const journeys = await Promise.all(
            departuresV2.slice(0, 2).map(departure => departure.links &&
                                                      vehicleJourney(departure.links.find(link => link.type === 'vehicle_journey').id,
                                                                     stations[0].geometry.coordinates, token)))

        const departuresV3 = departuresV2.map(departure => {
            const journey = journeys.find(j => departure.links && departure.links.some(link => link.id === j.link))
            const addition = journey ? {
                direction: journey.stops[journey.stops.length - 1],
                number: journey.missionCode || departure.departureData.number,
                stops: journey.stops} : {}
            return {
                ...departure,
                departureData: {
                    ...departure.departureData,
                    ...addition
                }
            }
        })

        notify({timetable:{station: stationName, departures: departuresV3.map(x => x.departureData)}})

        return Promise.resolve({station: stationName, departures: departuresV3.map(x => x.departureData)})
    }
}
