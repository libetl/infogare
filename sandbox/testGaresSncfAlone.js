import webservice from '../src/core/webservice'
import places from '../src/core/data/places'
import coloredStringifiedJson from './coloredStringifiedJson'

webservice.nextDepartures(places.lyonPartDieu, {dataSourceByFeature:{platforms: 'garesSncf', departures: 'garesSncf'}})
    .then(data => coloredStringifiedJson(data))
    .then(highlightedData => console.log(highlightedData))