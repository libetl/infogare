import core from '../src/core'
import places from '../src/core/data/places'
import coloredStringifiedJson from './coloredStringifiedJson'

core.nextDepartures(places.clamart, {dataSourceByFeature:{colors:'inMemory', departures: 'vianavigo', stations: 'vianavigo', platforms:'garesSncf', journeys:'terSncf', geolocation:'liveMap'}})
    .then(data => coloredStringifiedJson(data))
    .then(highlightedData => console.log(highlightedData))

