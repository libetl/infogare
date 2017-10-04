import {get} from 'axios'
import {stationsMatching, findIdfMapping, closestStations} from './inMemory'
import {getGaresSncfDepartures} from './garesSncf'
import {realTimeMap} from './liveMap'
import {sortByTime, combineAll, removeDuplicates} from './combine'
import tchoutchou from './raildar'
import {findStations, stationsDepartures, twoClosestJourneys, testApi} from './sncfApi'

export default {
    test: testApi,
    suggestStations: (text) => stationsMatching(text),
    nextDepartures: async ({long, lat}, token, notify = () => {}) => {
        const guessedStations = token && closestStations({long, lat})
        const guessedStationName = token && guessedStations[0].fields.intitule_gare
        const guessedStationCoords = token && {long: guessedStations[0].geometry.coordinates[0], lat: guessedStations[0].geometry.coordinates[1]}

        notify({timetable:{station: `${token ? guessedStationName : 'recherche sans token...'}\n(mise à jour...)`, departures: new Array(10).fill({})}})

        const stationsAreas = token ? await findStations(guessedStationCoords, guessedStationName, token) : await tchoutchou.gares({long, lat})
        const stationName = stationsAreas[0].name_gare || guessedStationName
        const stationCoords = guessedStationCoords || {lat: stationsAreas[0].lat, long: stationsAreas[0].lng}
        const iataCodes = (guessedStations || closestStations(stationCoords)).map(station => (station.fields.tvs || '').split('|')[0])

        const baseDepartures = removeDuplicates(sortByTime(token ? await stationsDepartures(stationsAreas, token) : await tchoutchou.get(stationsAreas)))

        notify({timetable:{station: `${stationName}\n(mise à jour...)`, departures: baseDepartures.map(x => x.dataToDisplay)}})

        const departures = combineAll(baseDepartures, await Promise.all([
            getGaresSncfDepartures(iataCodes),
            twoClosestJourneys(baseDepartures, closestStations, stationCoords, token),
            realTimeMap(stationCoords),
            findIdfMapping(baseDepartures)]))

        return Promise.resolve({station: stationName, departures: departures.map(x => x.dataToDisplay)})
    }
}
