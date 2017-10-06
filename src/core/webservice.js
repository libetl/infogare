import {sortByTime, combineAll, removeDuplicates, feedWithSources} from './operations/combine'
import {get} from 'axios'
import inMemory from './sources/inMemory'
import garesSncf from './sources/garesSncf'
import liveMap from './sources/liveMap'
import raildar from './sources/raildar'
import sncfApi from './sources/sncfApi'

export default {
    test: sncfApi.testApi,
    suggestStations: (text) => inMemory.stationsMatching(text),
    nextDepartures: async ({long, lat}, token, notify = () => {}) => {
        const guessedStations = token && inMemory.closestStations({long, lat})
        const guessedStationName = token && guessedStations[0].fields.intitule_gare
        const guessedStationCoords = token && {long: guessedStations[0].geometry.coordinates[0], lat: guessedStations[0].geometry.coordinates[1]}

        notify({timetable:{station: `${token ? guessedStationName : 'recherche sans token...'}\n(mise à jour...)`, departures: new Array(10).fill({})}})

        const stationsAreas = token ? await sncfApi.stationSearch(guessedStationCoords, guessedStationName, token) : await raildar.stationSearch({long, lat})
        const stationName = stationsAreas[0].name_gare || guessedStationName
        const stationCoords = guessedStationCoords || {lat: stationsAreas[0].lat, long: stationsAreas[0].lng}
        const iataCodes = (guessedStations || inMemory.closestStations(stationCoords)).map(station => (station.fields.tvs || '').split('|')[0])

        const baseDepartures = removeDuplicates(sortByTime(token ? await sncfApi.baseDepartures(stationsAreas, token) : await raildar.baseDepartures(stationsAreas)))

        notify({timetable:{station: `${stationName}\n(mise à jour...)`, departures: baseDepartures.map(x => x.dataToDisplay)}})

        const context = {baseDepartures, stationCoords, token, iataCodes, closestStations: inMemory.closestStations}
        const departures = combineAll(baseDepartures, await Promise.all(feedWithSources([garesSncf, sncfApi, liveMap, inMemory], context)))

        return Promise.resolve({station: stationName, departures: departures.map(x => x.dataToDisplay)})
    }
}
