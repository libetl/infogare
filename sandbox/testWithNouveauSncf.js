import webservice from '../src/core/webservice'
import places from '../src/core/data/places'
import coloredStringifiedJson from './coloredStringifiedJson'

webservice.nextDepartures(places.melun, {dataSourceByFeature:{colors:'inMemory', departures: 'nouveauSncf', stations: 'nouveauSncf', platforms:'nouveauSncf', journeys:'nouveauSncf', geolocation:'liveMap'}})
    .then(data => coloredStringifiedJson(data))
    .then(highlightedData => console.log(highlightedData))

