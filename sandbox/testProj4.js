import coloredStringifiedJson from './coloredStringifiedJson'
import vianavigo from '../src/core/sources/vianavigo'
import inMemory from '../src/core/sources/inMemory'
import places from '../src/core/data/places'

vianavigo.stationSearch(places.clamart, {nestedStationSearch:inMemory.stationSearch})
    .then(data => coloredStringifiedJson(data))
    .then(highlightedData => console.log(highlightedData))

