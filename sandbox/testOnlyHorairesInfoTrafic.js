import coloredStringifiedJson from './coloredStringifiedJson'
import core from '../src/core'
import places from '../src/core/data/places'

core.nextDepartures(places.parisGaredeLyon, {dataSourceByFeature: {departures: 'horairesInfoTrafic'}})
    .then(data => coloredStringifiedJson(data))
    .then((highlightedData) => console.log(highlightedData))