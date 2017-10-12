import webservice from '../src/core/webservice'
import places from '../src/core/data/places'
import coloredStringifiedJson from './coloredStringifiedJson'

webservice.nextDepartures(places.parisSaintLazare, {dataSourceByFeature:
    {platforms: 'garesSncf', departures: 'raildar', stations: 'raildar', colors: 'raildar', codes: 'raildar', journeys: 'raildar', geolocation: 'raildar'}})
    .then(data => coloredStringifiedJson(data))
    .then(highlightedData => console.log(highlightedData))