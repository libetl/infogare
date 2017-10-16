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
    nextDepartures: async (coords, {token, notify = () => {},
        dataSourceByFeature = {platforms: 'terSncf', departures: 'terSncf', stations: 'inMemory', colors: 'inMemory', codes: 'inMemory', journeys: 'terSncf', geolocation: 'liveMap'}} = {}) => {

        const allowedCombinedSources = Array.from(new Set(Object.values(dataSourceByFeature))).map(sourceName => sources[sourceName])

        const stationsAreas = await sources[dataSourceByFeature.stations || 'inMemory'].stationSearch(coords, {token, nestedStationSearch:sources.inMemory.stationSearch})
        notify({timetable:{station: `${dataSourceByFeature.departures === 'raildar' ? 'recherche raildar...' : stationsAreas.stationName}\n(mise à jour...)`, departures: new Array(10).fill({})}})

        const baseDepartures = !sources[dataSourceByFeature.departures] ? [] : removeDuplicates(sortByTime(await sources[dataSourceByFeature.departures].baseDepartures(stationsAreas, token)))
        notify({timetable:{station: `${stationsAreas.stationName}\n(mise à jour...)`, departures: baseDepartures.map(x => x.dataToDisplay)}})

        const context = {baseDepartures, stationsAreas, token, closestStations: sources.inMemory.closestStations}
        const departures = combineAll(baseDepartures, await Promise.all(feedWith(allowedCombinedSources, context)))

        return Promise.resolve({station: stationsAreas.stationName, departures: departures.map(x => x.dataToDisplay)})
    }
}
