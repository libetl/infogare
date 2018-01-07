import core from '../src/core'
import places from '../src/core/data/places'
import coloredStringifiedJson from './coloredStringifiedJson'

core.nextDepartures(places.parisMontparnasse, {dataSourceByFeature:{colors:'inMemory', departures: 'nouveauSncf', stations: 'nouveauSncf', platforms:'nouveauSncf', journeys:'nouveauSncf', geolocation:'liveMap'}})
    .then(data => coloredStringifiedJson(data))
    .then(highlightedData => console.log(highlightedData))
