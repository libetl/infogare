import webservice from '../src/core/webservice'
import places from '../src/core/data/places'
import coloredStringifiedJson from './coloredStringifiedJson'

webservice.nextDepartures(places.vanvesMalakoff, {token: process.env.TOKEN,
        dataSourceByFeature:{platforms: 'garesSncf', departures: 'sncfApi', stations: 'sncfApi', colors: 'inMemory', codes: 'inMemory', journeys: 'sncfApi', geolocation: 'liveMap'}})
    .then(data => coloredStringifiedJson(data))
    .then(highlightedData => console.log(highlightedData))

