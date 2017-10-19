import coloredStringifiedJson from './coloredStringifiedJson'
import webservice from '../src/core/webservice'
import places from '../src/core/data/places'

webservice.nextDepartures(places.parisGaredeLyon, {dataSourceByFeature: {departures: 'horairesInfoTrafic'}})
    .then(data => coloredStringifiedJson(data))
    .then((highlightedData) => console.log(highlightedData))