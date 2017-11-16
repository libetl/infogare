import {get} from 'axios'
import {sortByTime, combineAll, removeDuplicates, feedWith} from './operations/combine'
import sources from './sources'
import {format} from './operations/formatDisplay'

const allDataSources = Object.entries(sources).reduce((acc, [name, {metadata}]) => {return {...acc, [name]: metadata}}, {})

export default {
    dataSources: allDataSources,
    testToken: sources.sncfApi.testApi,
    minimalMappingFor: (wantedDataSources, listOfDataSources = allDataSources) => {
        const guess = wantedDataSources.sort((a, b) => listOfDataSources[a].features.length < listOfDataSources[b].features.length)
           .reduce((acc, value) => {return {...listOfDataSources[value].features
               .map(feature => {return {[feature]: value}}).reduce((acc1, value1) => {return {...acc1, ...value1}}, {}), ...acc}}, {})
        return {...guess, stations:(sources[guess.departures]||{}).stationSearch ? guess.departures : guess.stations || 'inMemory'}},
    suggestStations: (text) => sources.inMemory.stationsMatching(text),
    nextDepartures: async (coords, {token, notify = () => {},
        dataSourceByFeature = {platforms: 'terSncf', departures: 'terSncf', stations: 'inMemory', colors: 'inMemory', codes: 'inMemory', journeys: 'terSncf', geolocation: 'liveMap'}} = {}) => {

        const allowedCombinedSources = Array.from(new Set(Object.values(dataSourceByFeature))).map(sourceName => sources[sourceName])

        const stationsAreas = await sources[dataSourceByFeature.stations || 'inMemory'].stationSearch(coords, {token, nestedStationSearch:sources.inMemory.stationSearch})
        notify({timetable:{station: `${stationsAreas.stationName}\n(mise à jour...)`, departures: new Array(10).fill({})}})

        const baseDepartures = !sources[dataSourceByFeature.departures] ? [] : removeDuplicates(sortByTime(await sources[dataSourceByFeature.departures].baseDepartures(stationsAreas, token)))
        notify({timetable:{station: `${stationsAreas.stationName}\n(mise à jour...)`, departures: format(baseDepartures)}})

        const context = {baseDepartures, stationsAreas, token, closestStations: sources.inMemory.closestStations}
        const departures = combineAll(baseDepartures, await Promise.all(feedWith(allowedCombinedSources, context)))

        return Promise.resolve({station: stationsAreas.stationName, departures: format(departures)})
    }
}
