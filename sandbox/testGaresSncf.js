import core from '../src/core'
import places from '../src/core/data/places'
import coloredStringifiedJson from './coloredStringifiedJson'

core.nextDepartures(places.parisGaredeLyon, {dataSourceByFeature:
    {platforms: 'garesSncf', departures: 'garesSncf', stations: 'inMemory', colors: 'inMemory', codes: 'inMemory'}})
    .then(data => coloredStringifiedJson(data))
    .then(highlightedData => console.log(highlightedData))