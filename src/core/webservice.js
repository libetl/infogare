import {get} from 'axios'
import moment from 'moment'
import flatten from 'arr-flatten'
import {closestStations, idfMapping} from './inMemory'
import {getGaresSncfDepartures, combineTchoutchouAndGaresSncf} from './garesSncf'
import {thresholdBetweenTimeAndDistance, realTimeMap} from './liveMap'
import tchoutchou from './raildar'
import {places, inverseGeocoding, departures, vehicleJourney, testApi} from './sncfApi'

export default {
    test: testApi,
    nextDepartures: async ({long, lat}, token, notify = () => {}) => {
        const updating = '(mise à jour...)'
        const sortedByDateTime = (departuresData) => [].concat.apply([], departuresData).sort((d1, d2) =>
            d1.stop_date_time.base_departure_date_time.localeCompare(d2.stop_date_time.base_departure_date_time))

        const stations = closestStations({long, lat})
        const stationName = stations[0].fields.intitule_gare
        const stationCoords = {long: stations[0].geometry.coordinates[0], lat: stations[0].geometry.coordinates[1]}

        notify({timetable:{station: `${stationName}\n${updating}`, departures: new Array(10).fill({})}})

        const stationsAreas = await inverseGeocoding(stationCoords, token).catch(e => places(stationName, token))
        const openDataDepartures = token ? await Promise.all(stationsAreas.map(stationArea => departures(stationArea.id, 0, token))) :
            tchoutchou.get({long, lat})

        const departuresV1 = sortedByDateTime(flatten(openDataDepartures)).map(departure => {
            return {
                links: departure.links,
                dataToDisplay: {
                    mode: departure.display_informations.commercial_mode,
                    direction: departure.display_informations.direction.replace(/ \([^)]+\)$/, ''),
                    name: departure.display_informations.code,
                    color: departure.display_informations.color,
                    number: departure.display_informations.headsign,
                    time: moment(departure.stop_date_time.departure_date_time, 'YYYYMMDDTHHmmss').format('HH:mm'),
                    stops: departure.display_informations.stops
                }
            }
        })

        notify({timetable:{station: `${stationName}\n${updating}`, departures: departuresV1.map(x => x.dataToDisplay)}})

        const iataCodes = stations.map(station => (station.fields.tvs || '').split('|')[0])
        const garesSncfDepartures = await Promise.all(iataCodes.map(iataCode => getGaresSncfDepartures(iataCode)))
        const allPlatformsDepartures = flatten(garesSncfDepartures)

        const departuresV2 = departuresV1.some(departure => departure.links) ? departuresV1.map(departure => {
            return {
                ...departure,
                savedNumber: parseInt(departure.dataToDisplay.number),
                dataToDisplay: {
                    ...departure.dataToDisplay,
                    number: idfMapping[departure.dataToDisplay.number] || departure.dataToDisplay.number,
                    platform: (allPlatformsDepartures.find(x => x.num === departure.dataToDisplay.number) || {voie: ''}).voie
                }
            }
        }) : sortedByDateTime(combineTchoutchouAndGaresSncf (departuresV1, allPlatformsDepartures))

        notify({timetable:{station: `${stationName}\n${updating}`, departures: departuresV2.map(x => x.dataToDisplay)}})

        const journeys = await Promise.all(
            departuresV2.slice(0, 2).map(departure => departure.links &&
                vehicleJourney(closestStations, departure.links.find(link => link.type === 'vehicle_journey').id,
                    stations[0].geometry.coordinates, token)))

        const departuresV3 = departuresV2.map(departure => {
            const journey = journeys.find(j => departure.links && departure.links.some(link => link.id === j.link))
            const addition = journey ? {
                direction: journey.stops[journey.stops.length - 1],
                number: journey.missionCode || departure.dataToDisplay.number,
                stops: journey.stops} : {}
            return {
                ...departure,
                dataToDisplay: {
                    ...departure.dataToDisplay,
                    ...addition
                }
            }
        })

        notify({timetable:{station: `${stationName}\n${updating}`, departures: departuresV3.map(x => x.dataToDisplay)}})

        const realTimeData = await realTimeMap(stationCoords)
        const departuresV4 = departuresV3.map(departure => {
            const realTimeTrain = realTimeData.filter(train => train.number === departure.savedNumber) [0]
            const minutesBeforeDeparture = moment(departure.dataToDisplay.time, 'HH:mm').diff(moment(), 'minutes')
            return {...departure,
                dataToDisplay: {
                    ...departure.dataToDisplay,
                    status: Math.abs(minutesBeforeDeparture) > thresholdBetweenTimeAndDistance ? undefined :
                        realTimeTrain && realTimeTrain.names.includes('OnPlatform') && realTimeTrain.distance <= 0.4 ? 'à quai' :
                            realTimeTrain ? `< ${Math.ceil(realTimeTrain.distance)} km` :
                                departure.dataToDisplay.mode.toLowerCase() === 'rer' ?  undefined :
                                    'retardé'
                }
            }
        })

        return Promise.resolve({station: stationName, departures: departuresV4.map(x => x.dataToDisplay)})
    }
}
