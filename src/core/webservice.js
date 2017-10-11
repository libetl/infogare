import {get} from 'axios'
import {sortByTime, combineAll, removeDuplicates, feedWith} from './operations/combine'
import sources from './sources'

export default {
    dataSources: Object.entries(sources).reduce((acc, [name, {metadata}]) => {return {...acc, [name]: metadata}}, {}),
    test: sources.sncfApi.testApi,
    minimalMappingFor: (allDataSources, wantedDataSources) => wantedDataSources.sort((a, b) => allDataSources[a].features.length < allDataSources[b].features.length)
           .reduce((acc, value) => {return {...allDataSources[value].features
               .map(feature => {return {[feature]: value}}).reduce((acc1, value1) => {return {...acc1, ...value1}}, {}), ...acc}}, {}),
    suggestStations: (text) => sources.inMemory.stationsMatching(text),
    nextDepartures: async ({long, lat}, {token, notify = () => {},
        dataSourceByFeature = {platforms: 'terSncf', departures: 'terSncf', stations: 'inMemory', colors: 'inMemory', codes: 'inMemory', journeys: 'terSncf', geolocation: 'liveMap'}} = {}) => {

        const allowedCombinedSources = Array.from(new Set(Object.values(dataSourceByFeature))).map(sourceName => sources[sourceName])
        const guessedStations = sources.inMemory.closestStations({long, lat})
        const guessedStationName = guessedStations[0].fields.intitule_gare
        const guessedStationCoords = {long: guessedStations[0].geometry.coordinates[0], lat: guessedStations[0].geometry.coordinates[1]}

        notify({timetable:{station: `${dataSourceByFeature.departures === 'raildar' ? 'recherche raildar...' : guessedStationName}\n(mise à jour...)`, departures: new Array(10).fill({})}})

        const stationsAreas = sources[dataSourceByFeature.stations].stationSearch ?
            await sources[dataSourceByFeature.stations].stationSearch(guessedStationCoords, {guessedStationName, token}) : guessedStations
        const stationName = stationsAreas[0].name_gare || guessedStationName
        const stationCoords = guessedStationCoords || {lat: stationsAreas[0].lat, long: stationsAreas[0].lng}
        const iataCodes = (guessedStations || sources.inMemory.closestStations(stationCoords)).map(station => (station.fields.tvs || '').split('|')[0])

        const baseDepartures = removeDuplicates(sortByTime(await sources[dataSourceByFeature.departures].baseDepartures(stationsAreas, token)))

        notify({timetable:{station: `${stationName}\n(mise à jour...)`, departures: baseDepartures.map(x => x.dataToDisplay)}})

        const context = {baseDepartures, stationName, stationsAreas, stationCoords, token, iataCodes, closestStations: sources.inMemory.closestStations}
        const departures = combineAll(baseDepartures, await Promise.all(feedWith(allowedCombinedSources, context)))

        return Promise.resolve({station: stationName, departures: departures.map(x => x.dataToDisplay)})
    }
}
