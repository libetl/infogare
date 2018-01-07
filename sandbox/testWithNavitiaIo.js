import core from '../src/core'
import coloredStringifiedJson from './coloredStringifiedJson'
import places from '../src/core/data/places'

// Châtillon Montrouge {lat: 48.8108397, long: 2.3017168}
core.nextDepartures({lat: 48.8108397, long: 2.3017168}, {tokens: {navitiaIo: process.env.TOKEN},
        notify:(data) => console.log(coloredStringifiedJson(data)),
        dataSourceByFeature:{departures: 'navitiaIo', stations: 'navitiaIo', journeys: 'navitiaIo'}})
    .then(data => coloredStringifiedJson(data))
    .then(highlightedData => console.log(highlightedData))

