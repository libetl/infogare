import core from '../src/core'
import places from '../src/core/data/places'
import coloredStringifiedJson from './coloredStringifiedJson'

core.nextDepartures(places.sainttienneLeClapier, {dataSourceByFeature: {stations: 'stas', departures: 'stas'}})
    .then(data => coloredStringifiedJson(data))
    .then(highlightedData => console.log(highlightedData))