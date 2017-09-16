//import fs from 'fs'
import {realTimeMap} from '../src/core/liveMap'
import places from '../src/core/places'
import coloredStringifiedJson from './coloredStringifiedJson'
//import nock from 'nock'

//nock('http://sncf-maps.hafas.de').get(/^\/carto\/livemaps.*/).reply(200, fs.readFileSync('sandbox/fakeLiveMap.json'))

realTimeMap(places.laDefense).then(geolocations => console.log(coloredStringifiedJson(geolocations)))
