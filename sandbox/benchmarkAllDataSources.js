import core from '../src/core'
import places from '../src/core/data/places'
import sources from '../src/core/sources'
import {benchmark} from './benchmark'

const theContestants = Object.keys(sources).map(source =>
    sources[source].metadata.needsExtraSourceForGeolocation ?
        {[source]:core.minimalMappingFor([source, 'inMemory', 'liveMap'])} :
        {[source]:core.minimalMappingFor([source, 'inMemory'])})
    .reduce((acc, value) => {return {...acc, ...value}}, {})

benchmark({theContestants,
    forThisWork: contestant => core.nextDepartures(places.parisGaredeLyon,
        {tokens: {sncfApi: process.env.SNCF_TOKEN, navitiaIo: process.env.NAVITIA_TOKEN}, contestant}),
    howManyTimes: 10,
    barSettings: {width: 100.0, gradient: ['\x1B[47m', '\x1B[42m', '\x1B[46m', '\x1B[45m', '\x1B[41m']},
    asText: true, logInConsole: true})
