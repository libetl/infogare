import {get} from 'axios'
import moment from 'moment'
import flatten from 'arr-flatten'
import {stationsMatching, closestStations, idfMapping} from './inMemory'
import {getGaresSncfDepartures, combineTchoutchouAndGaresSncf} from './garesSncf'
import {thresholdBetweenTimeAndDistance, realTimeMap} from './liveMap'
import combine from './combine'
import tchoutchou from './raildar'
import {places, inverseGeocoding, departures, vehicleJourney, testApi} from './sncfApi'

export default {
    test: testApi,
    suggestStations: (text) => stationsMatching(text),
    nextDepartures: async ({long, lat}, token, notify = () => {}) => {
        const sortedByDateTime = (departuresData) => [].concat.apply([], departuresData).sort((d1, d2) =>
            d1.stop_date_time.base_departure_date_time.localeCompare(d2.stop_date_time.base_departure_date_time))

        const guessedStations = token && closestStations({long, lat})
        const guessedStationName = token && guessedStations[0].fields.intitule_gare
        const guessedStationCoords = token && {long: guessedStations[0].geometry.coordinates[0], lat: guessedStations[0].geometry.coordinates[1]}

        notify({timetable:{station: `${token ? guessedStationName : 'recherche...'}\n(mise à jour...)`, departures: new Array(10).fill({})}})

        const stationsAreas = token ? await inverseGeocoding(guessedStationCoords, token).catch(e => places(guessedStationName, token)) : await tchoutchou.gares({long, lat})
        const stationName = stationsAreas[0].name_gare || guessedStationName
        const stationCoords = guessedStationCoords || {lat: stationsAreas[0].lat, long: stationsAreas[0].lng}
        const iataCodes = (guessedStations || closestStations(stationCoords)).map(station => (station.fields.tvs || '').split('|')[0])

        notify({timetable:{station: `${stationName}\n(mise à jour...)`, departures: new Array(10).fill({})}})

        const openDataDepartures = token ? await Promise.all(stationsAreas.map(stationArea => departures(stationArea.id, 0, token))) : await tchoutchou.get(stationsAreas)
        const departuresV1 = flatten(openDataDepartures)

        notify({timetable:{station: `${stationName}\n(mise à jour...)`, departures: departuresV1.map(x => x.dataToDisplay)}})

        const garesSncfDepartures = await Promise.all(iataCodes.map(iataCode => getGaresSncfDepartures(iataCode)))
        const allPlatformsDepartures = flatten(garesSncfDepartures)

        const departuresV2 = sortedByDateTime(departuresV1)
        const departuresV3 = combine(departuresV2, allPlatformsDepartures)

        notify({timetable:{station: `${stationName}\n(mise à jour...)`, departures: departuresV3.map(x => x.dataToDisplay)}})

        const journeys = token ? await Promise.all(
            departuresV3.slice(0, 2).map(departure => departure.links &&
                vehicleJourney(closestStations, departure.links.find(link => link.type === 'vehicle_journey').id,
                    stationCoords, token))) : []

        const departuresV4 = combine(departuresV3, journeys)

        notify({timetable:{station: `${stationName}\n(mise à jour...)`, departures: departuresV4.map(x => x.dataToDisplay)}})

        const realTimeData = await realTimeMap(stationCoords)
        const departuresV5 = departuresV4.map(departure => {
            const realTimeTrain = realTimeData.find(train => train.number === departure.savedNumber) ||
                realTimeData.find(train => train.number === departure.longMissionCode)
            const minutesBeforeDeparture = moment(departure.dataToDisplay.time, 'HH:mm').diff(moment(), 'minutes')
            return {...departure,
                dataToDisplay: {
                    ...departure.dataToDisplay,
                    status: Math.abs(minutesBeforeDeparture) > thresholdBetweenTimeAndDistance ? undefined :
                        realTimeTrain && realTimeTrain.names.includes('OnPlatform') && realTimeTrain.distance <= 0.4 ? 'à quai' :
                            realTimeTrain ? `< ${Math.ceil(realTimeTrain.distance)} km` :
                                departure.dataToDisplay.mode.toLowerCase() === 'rer' ?  undefined :
                                    departure.departureStation ? undefined :
                                        departure.dataToDisplay.status ? departure.dataToDisplay.status : 'retardé'
                }
            }
        })

        return Promise.resolve({station: stationName, departures: departuresV5.map(x => x.dataToDisplay)})
    }
}
