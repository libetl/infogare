import core from '../src/core'
import places from '../src/core/data/places'
import coloredStringifiedJson from './coloredStringifiedJson'

core.nextDepartures(places.vanvesMalakoff, {tokens: {sncfApi: process.env.TOKEN},
        notify:(data) => console.log(coloredStringifiedJson(data)),
        dataSourceByFeature:{platforms: 'garesSncf', departures: 'sncfApi', stations: 'sncfApi', colors: 'inMemory', codes: 'inMemory', journeys: 'sncfApi', geolocation: 'liveMap'}})
    .then(data => coloredStringifiedJson(data))
    .then(highlightedData => console.log(highlightedData))

