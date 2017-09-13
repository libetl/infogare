import {realTimeMap} from '../src/core/liveMap'
import places from '../src/core/places'

realTimeMap(places.laDefense)
    .then(geolocations => console.log(geolocations))
