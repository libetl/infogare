import {get} from 'axios'
import {stationsMatching, closestStations} from './inMemory'
import {getGaresSncfDepartures} from './garesSncf'
import {realTimeMap} from './liveMap'
import {sortByTime, combineAll} from './combine'
import tchoutchou from './raildar'
import {places, inverseGeocoding, stationsDepartures, twoClosestJourneys, testApi} from './sncfApi'

export default {
    test: testApi,
    suggestStations: (text) => stationsMatching(text),
    nextDepartures: async ({long, lat}, token, notify = () => {}) => {
        const guessedStations = token && closestStations({long, lat})
        const guessedStationName = token && guessedStations[0].fields.intitule_gare
        const guessedStationCoords = token && {long: guessedStations[0].geometry.coordinates[0], lat: guessedStations[0].geometry.coordinates[1]}

        notify({timetable:{station: `${token ? guessedStationName : 'recherche...'}\n(mise à jour...)`, departures: new Array(10).fill({})}})

        const stationsAreas = token ? await inverseGeocoding(guessedStationCoords, token).catch(e => places(guessedStationName, token)) : await tchoutchou.gares({long, lat})
        const stationName = stationsAreas[0].name_gare || guessedStationName
        const stationCoords = guessedStationCoords || {lat: stationsAreas[0].lat, long: stationsAreas[0].lng}
        const iataCodes = (guessedStations || closestStations(stationCoords)).map(station => (station.fields.tvs || '').split('|')[0])

        const baseDepartures = sortByTime(token ? await stationsDepartures(stationsAreas, token) : await tchoutchou.get(stationsAreas))

        notify({timetable:{station: `${stationName}\n(mise à jour...)`, departures: baseDepartures.map(x => x.dataToDisplay)}})

        const departures = combineAll(baseDepartures, [
            await getGaresSncfDepartures(iataCodes),
            await twoClosestJourneys(baseDepartures, closestStations, stationCoords, token),
            await realTimeMap(stationCoords)])

        return Promise.resolve({station: stationName, departures: departures.map(x => x.dataToDisplay)})
    }
}
