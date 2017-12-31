import core from '../src/core'
import places from '../src/core/data/places'
import coloredStringifiedJson from './coloredStringifiedJson'

core.nextDepartures(places.niceSaintAugustin, {dataSourceByFeature:{departures: 'flightRadar', stations: 'flightRadar'}})
    .then(data => coloredStringifiedJson(data))
    .then(highlightedData => console.log(highlightedData))
    .catch(e => {console.log(e);debugger})
