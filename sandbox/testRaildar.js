import core from '../src/core'
import places from '../src/core/data/places'
import coloredStringifiedJson from './coloredStringifiedJson'

core.nextDepartures(places.quimper, {dataSourceByFeature:
    {platforms: 'garesSncf', departures: 'raildar', stations: 'raildar', colors: 'raildar', codes: 'raildar', journeys: 'raildar', geolocation: 'raildar'}})
    .then(data => coloredStringifiedJson(data))
    .then(highlightedData => console.log(highlightedData))