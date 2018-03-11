import coloredStringifiedJson from './coloredStringifiedJson'
import core from '../src/core'
import places from '../src/core/data/places'

core.nextDepartures(places.parisGaredeLyon, {dataSourceByFeature: {codes: 'inMemory', departures: 'herokuHomegrown'}})
    .then(data => coloredStringifiedJson(data))
    .then((highlightedData) => console.log(highlightedData))