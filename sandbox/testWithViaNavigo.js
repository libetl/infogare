import webservice from '../src/core/webservice'
import places from '../src/core/data/places'
import coloredStringifiedJson from './coloredStringifiedJson'

webservice.nextDepartures(places.vanvesMalakoff, {token: process.env.TOKEN,
        dataSourceByFeature:{departures: 'viaNavigo', stations: 'viaNavigo'}})
    .then(data => coloredStringifiedJson(data))
    .then(highlightedData => console.log(highlightedData))

