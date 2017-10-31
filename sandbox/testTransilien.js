import webservice from '../src/core/webservice'
import places from '../src/core/data/places'
import coloredStringifiedJson from './coloredStringifiedJson'

webservice.nextDepartures(places.laDefense, { dataSourceByFeature:{stations: 'inMemory', departures: 'transilien'}}).then(data => coloredStringifiedJson(data))
    .then(highlightedData => console.log(highlightedData))