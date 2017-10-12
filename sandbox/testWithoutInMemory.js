import webservice from '../src/core/webservice'
import places from '../src/core/data/places'
import coloredStringifiedJson from './coloredStringifiedJson'

webservice.nextDepartures(places.parisSaintLazare, {dataSourceByFeature:
    {platforms: 'terSncf', departures: 'terSncf', journeys: 'terSncf', geolocation: 'liveMap'}})
    .then(data => coloredStringifiedJson(data))
    .then(highlightedData => console.log(highlightedData))