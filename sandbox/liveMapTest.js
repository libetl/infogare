//import fs from 'fs'
import liveMap from '../src/core/sources/liveMap'
import places from '../src/core/data/places'
import coloredStringifiedJson from './coloredStringifiedJson'
//import nock from 'nock'

//nock('http://sncf-maps.hafas.de').get(/^\/carto\/livemaps.*/).reply(200, fs.readFileSync('sandbox/fakeLiveMap.json'))

liveMap.feed[0]({stationsAreas:{nestedSearchData:{stationCoords:places.laDefense}}}).then(geolocations => console.log(coloredStringifiedJson(geolocations)))
