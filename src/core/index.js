import {get} from 'axios'
import {minimalMappingFor, sortByTime, combineAll, removeDuplicates, feedWith} from './operations/combine'
import sources from './sources'
import {format} from './operations/formatDisplay'

export default {
    dataSources: Object.entries(sources).reduce((acc, [name, {metadata}]) => {return {...acc, [name]: metadata}}, {}),
    testToken: ({type, newValue}) => type === 'apiToken' ? sources.sncfApi.testApi(newValue) : sources.navitiaIo.testApi(newValue),
    minimalMappingFor: wantedDataSources => minimalMappingFor(wantedDataSources, sources),
    suggestStations: text => sources.inMemory.stationsMatching(text),
    nextDepartures: async (coords, {tokens = {}, notify = () => {},
        dataSourceByFeature = {platforms: 'terSncf', departures: 'terSncf', stations: 'inMemory', colors: 'inMemory', codes: 'inMemory', journeys: 'terSncf', geolocation: 'liveMap'}} = {}) => {

        const allowedCombinedSources = Array.from(new Set(Object.values(dataSourceByFeature))).map(sourceName => sources[sourceName])

        const stationsAreas = await sources[dataSourceByFeature.stations || 'inMemory'].stationSearch(coords, {token: tokens[dataSourceByFeature.stations], nestedStationSearch:sources.inMemory.stationSearch})
        notify({timetable:{station: `${stationsAreas.stationName}\n(mise à jour...)`, departures: new Array(10).fill({})}})

        const baseDepartures = !sources[dataSourceByFeature.departures] ? [] : removeDuplicates(sortByTime(await sources[dataSourceByFeature.departures].baseDepartures(stationsAreas, tokens[dataSourceByFeature.departures])))
        notify({timetable:{station: `${stationsAreas.stationName}\n(mise à jour...)`, departures: format(baseDepartures)}})

        const context = {baseDepartures, stationsAreas, token: tokens[dataSourceByFeature.departures], closestStations: sources.inMemory.closestStations}
        const departures = combineAll(baseDepartures, await Promise.all(feedWith(allowedCombinedSources, context)))

        return Promise.resolve({station: stationsAreas.stationName, departures: format(departures)})
    }
}
