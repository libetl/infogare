import webservice from '../src/core/webservice'
import somePlaces from '../src/core/somePlaces'
import coloredStringifiedJson from './coloredStringifiedJson'

webservice.nextDepartures(somePlaces.parisGareDeLyon, undefined)
    .then(data => coloredStringifiedJson(data))
    .then((highlightedData) => console.log(highlightedData))

