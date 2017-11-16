import core from '../src/core'
import places from '../src/core/data/places'
import coloredStringifiedJson from './coloredStringifiedJson'

core.nextDepartures(places.creil, { dataSourceByFeature:{stations: 'inMemory', departures: 'transilien'}}).then(data => coloredStringifiedJson(data))
    .then(highlightedData => console.log(highlightedData))