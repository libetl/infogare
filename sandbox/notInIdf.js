import core from '../src/core'
import places from '../src/core/data/places'
import coloredStringifiedJson from './coloredStringifiedJson'

core.nextDepartures(places.antibes, {token: process.env.TOKEN})
    .then(data => coloredStringifiedJson(data))
    .then((highlightedData) => console.log(highlightedData))

