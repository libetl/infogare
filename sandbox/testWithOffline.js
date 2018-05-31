import core from '../src/core'
import sources from '../src/core/sources'
import coloredStringifiedJson from './coloredStringifiedJson'
import places from '../src/core/data/places'

sources.offline.init().then (_ =>
    core.nextDepartures(places.clamart, {
        dataSourceByFeature:{departures: 'offline', stations: 'offline', journeys: 'offline'}})
        .then(data => coloredStringifiedJson(data))
        .then(highlightedData => console.log(highlightedData)))

