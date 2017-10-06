import coloredStringifiedJson from './coloredStringifiedJson'
import webservice from '../src/core/webservice'
import places from '../src/core/data/places'

webservice.nextDepartures(places.sainttienneBellevue, {mode: 'terSncf'})
    .then(data => coloredStringifiedJson(data))
    .then((highlightedData) => console.log(highlightedData))