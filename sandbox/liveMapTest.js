import {realTimeMap} from '../src/core/liveMap'
import somePlaces from "../src/core/somePlaces";

realTimeMap(somePlaces.laDefense)
    .then(geolocations => console.log(geolocations))
