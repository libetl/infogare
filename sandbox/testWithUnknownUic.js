import core from '../src/core'
import places from '../src/core/data/places'
import coloredStringifiedJson from './coloredStringifiedJson'

//one of the UICs codes inside paris nord is unknown for ter sncf data source
core.nextDepartures(places.parisGareduNord).then(data => coloredStringifiedJson(data))
    .then(highlightedData => console.log(highlightedData))