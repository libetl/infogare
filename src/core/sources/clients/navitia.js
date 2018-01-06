import {get} from 'axios'
import moment from 'moment'
import geoJsonUtils from 'geojson-utils'
import {blackOrWhite} from '../../operations/blackOrWhite'

export default  ({hostname, coverage, metadata}) => {
  const coveragePrefix = foundCoverage => `${hostname}/v1/coverage/${foundCoverage ? foundCoverage + '/' : ''}`
  const stationUrlPrefix = foundCoverage => `${coveragePrefix(foundCoverage)}stop_areas/`
  const stationUrl = (foundCoverage, stationId, dateTime, startPage) => `${stationUrlPrefix(foundCoverage)}${stationId}/departures?start_page=${startPage}&from_datetime=${dateTime.format('YYYYMMDDTHHmmss')}`
  const inverseGeocodingUrl = (foundCoverage, {long, lat}) => `${coveragePrefix(foundCoverage)}coords/${long};${lat}/places_nearby?type[]=stop_area`
  const vehicleJourneyUrl = (foundCoverage, vehicleJourney) => `${coveragePrefix(foundCoverage)}vehicle_journeys/${vehicleJourney}`
  const placeUrl = (foundCoverage, place) => `${coveragePrefix(foundCoverage)}places?q=${place}`

  const defaultEntity = token => {return {headers: {Authorization: token || null}}}
  const fetch = (url, entity) => entity && entity.headers && entity.headers.Authorization === null ? Promise.resolve() : get(url, entity)

  const places = (foundCoverage, label, token) => fetch(placeUrl(foundCoverage, label), defaultEntity(token))
    .then(result => !result.data.places ? Promise.resolve([]) :
        Promise.resolve([result.data.places.filter(place => place.embedded_type === 'stop_area').sort((a, b) => b.quality - a.quality)]))

  const inverseGeocoding = (foundCoverage, coords, token) => fetch(inverseGeocodingUrl(foundCoverage, coords), defaultEntity(token))
    .then(result => {
        if (!result) {
            return Promise.resolve([])
        }
        if (!result.data.places_nearby) {
            throw new Error(`Gare non trouvée par géolocalisation inversée {lat:${coords.lat}, long:${coords.long}}`)
        }
        return Promise.resolve(result.data.places_nearby)
    }).catch(error => {console.log(`${inverseGeocodingUrl(foundCoverage, coords)}: ${error}`);throw error})

  const baseDepartures = (stationsAreas, token) => token ?
    Promise.all(stationsAreas.apiData.map(row => departures(stationsAreas.foundCoverage, row.id, 0, token))).then(departuresArrays =>
     departuresArrays.reduce((acc, value) => acc.concat(value||[]), [])) :
    Promise.resolve([{links: [], stop_date_time: '00:00', savedNumber: 1,dataToDisplay: {direction:'Token nécessaire'}}])

  const departures = (foundCoverage, stationId, page = 0, token) => fetch(stationUrl(foundCoverage, stationId, moment().subtract(-1, 'minutes'), page), defaultEntity(token))
    .then(result => {debugger;return Promise.resolve([...result.data.departures])})
    .then(result => result.map(departure => ({
        links: departure.links,
        stop_date_time: departure.stop_date_time,
        savedNumber: isNaN(departure.display_informations.headsign) ? departure.display_informations.headsign :
            parseInt(departure.display_informations.headsign),
        dataToDisplay: {
            mode: (departure.display_informations.commercial_mode||'').replace(/é/g, 'e').replace(/è/g, 'è'),
            direction: departure.display_informations.direction.replace(/ \([^)]+\)$/, ''),
            name: departure.display_informations.commercial_mode !== 'Bus' &&
                departure.display_informations.commercial_mode !== 'Metro' &&
                departure.display_informations.commercial_mode !== 'Tramway' ?
                departure.display_informations.code : undefined,
            color: departure.display_informations.color,
            fontColor: departure.display_informations.color ? blackOrWhite(departure.display_informations.color) : undefined,
            number: isNaN(departure.display_informations.headsign) ? departure.display_informations.label :
                parseInt(departure.display_informations.headsign),
            status: departure.display_informations.status,
            time: moment(departure.stop_date_time.departure_date_time, 'YYYYMMDDTHHmmss').format('HH:mm'),
            stops: departure.display_informations.stops || []
        }}))).catch(error => {console.log(`${stationUrl(foundCoverage, stationId, moment(), page)}: ${error}`);Promise.resolve([])})

  const vehicleJourney = (foundCoverage, closestStations, link, fromCoords, token) => fetch(vehicleJourneyUrl(foundCoverage, link), defaultEntity(token))
    .then(result => {
        const allStops = result.data.vehicle_journeys[0].stop_times.map(stop_time => stop_time.stop_point.name)
        const allStopsCoords = result.data.vehicle_journeys[0].stop_times.map(stop_time => ({
            name:stop_time.stop_point.name,
            coordinates:[parseFloat(stop_time.stop_point.coord.lon), parseFloat(stop_time.stop_point.coord.lat)]}))
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

  const testApi = token => fetch(coveragePrefix(coverage), defaultEntity(token))

  const twoClosestJourneys = ({baseDepartures, closestStations, stationsAreas:{stationCoords, foundCoverage}, token}) => !token ? Promise.resolve([]) :
    Promise.all(
        baseDepartures.slice(0, 2).map(departure => departure.links &&
            vehicleJourney(foundCoverage, closestStations, departure.links.find(link => link.type === 'vehicle_journey').id,
                stationCoords, token)))

  const findCoverage = ({lat, long}, token) => coverage ? Promise.resolve(coverage) :
          fetch(coveragePrefix(), defaultEntity(token))
              .then(allCoverages => allCoverages && allCoverages.data.regions.map(r => ({id: r.id, shape: {type: 'MultiPolygon',
                              coordinates: [[r.shape.replace('MULTIPOLYGON(((', '')
                                  .replace('(((', '').split(',').map(c => c.split(' ').map(x => parseFloat(x)))]]}
                      })).find(r => geoJsonUtils.pointInPolygon({type: 'Point', coordinates: [long, lat]}, r.shape)))


  const stationSearch = (coords, {token, nestedStationSearch}) => {
    const stationsAreas = coverage ? nestedStationSearch(coords, {token}) :
        {nestedSearchData: {stationCoords: coords, stationName: '?', stations: []}}
    const {stationCoords, stationName, stations} = stationsAreas['nestedSearchData']
    return findCoverage(coords, token).then(answer =>
        inverseGeocoding(answer && answer.id || coverage, stationCoords, token)
            .catch(e => places(answer && answer.id || coverage, stationName, token))
        .then(apiData => ({apiData, foundCoverage: answer && answer.id || coverage, stations, ...stationsAreas, stationCoords,
            stationName:apiData.length ? apiData[0].stop_area.name : stationsAreas.stationName})))
  }
  return {testApi, stationSearch, baseDepartures, feed:[twoClosestJourneys], metadata}
}