import {get} from 'axios'
import {sortByTime, combineAll, removeDuplicates, feedWith} from './operations/combine'
import sources from './sources'

export default {
    test: sources.sncfApi.testApi,
    suggestStations: (text) => sources.inMemory.stationsMatching(text),
    nextDepartures: async ({long, lat}, {token, notify = () => {}, mode = token ? 'sncfApi' : 'raildar'} = {}) => {
        const preferredSource = sources[mode]
        const guessedStations = sources.inMemory.closestStations({long, lat})
        const guessedStationName = guessedStations[0].fields.intitule_gare
        const guessedStationCoords = {long: guessedStations[0].geometry.coordinates[0], lat: guessedStations[0].geometry.coordinates[1]}

        notify({timetable:{station: `${mode === 'raildar' ? 'recherche raildar...' : guessedStationName}\n(mise à jour...)`, departures: new Array(10).fill({})}})

        const stationsAreas = await preferredSource.stationSearch(guessedStationCoords, {guessedStationName, token})
        const stationName = stationsAreas[0].name_gare || guessedStationName
        const stationCoords = guessedStationCoords || {lat: stationsAreas[0].lat, long: stationsAreas[0].lng}
        const iataCodes = (guessedStations || sources.inMemory.closestStations(stationCoords)).map(station => (station.fields.tvs || '').split('|')[0])

        const baseDepartures = removeDuplicates(sortByTime(await preferredSource.baseDepartures(stationsAreas, token)))

        notify({timetable:{station: `${stationName}\n(mise à jour...)`, departures: baseDepartures.map(x => x.dataToDisplay)}})

        const context = {baseDepartures, stationName, stationsAreas, stationCoords, token, iataCodes, closestStations: sources.inMemory.closestStations}
        const departures = combineAll(baseDepartures, await Promise.all(feedWith(sources, context)))

        return Promise.resolve({station: stationName, departures: departures.map(x => x.dataToDisplay)})
    }
}
