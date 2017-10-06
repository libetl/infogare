import horairesInfoTrafic from '../src/core/sources/horairesInfoTrafic'
import coloredStringifiedJson from './coloredStringifiedJson'
import webservice from '../src/core/webservice'
import places from '../src/core/data/places'

webservice.nextDepartures(places.biarritz, {mode: 'horairesInfoTrafic'})
    .then(data => coloredStringifiedJson(data))
    .then((highlightedData) => console.log(highlightedData))