import {get, post} from 'axios'
import moment from 'moment'
import haversine from './haversine'

const maxDistanceInRealTimeMap = 500000

const read = (jnyL, prodL, remL, locL, {lat, long}) => jnyL
    .map(train => {return {...train, ...prodL[train.prodX], remarks:[...new Set(train.remL)].map(rem => {return {...rem, ...remL[rem.remX]}}),
        lines:train.ani && [...new Set(train.ani.fLocX)].map(loc => locL[loc])}})
    .map(train => {return {...train, names:train.remarks.filter(r => r.code = 'FD').map(r => r.txtN)}})
    .map(train => {return {...train, number:(train.names.map(name => name.match(/\s+[0-9]+$/) && parseInt(name.match(/\s+[0-9]+$/)[0])) || [])[0]}})
    .map(train => {return {...train, distance:haversine({lat, long}, {lat:train.pos.y / 1E6, long:train.pos.x / 1E6})}})

const realTimeTrains = ({lat, long}) => get(`http://sncf-maps.hafas.de/carto/livemaps?service=journeygeopos&rect=${Math.floor(long * 1E6) - maxDistanceInRealTimeMap},${Math.floor(lat * 1E6) - maxDistanceInRealTimeMap},${Math.floor(long * 1E6) + maxDistanceInRealTimeMap},${Math.floor(lat * 1E6) + maxDistanceInRealTimeMap}&i=35000&is=10000&prod=27&date=${moment().format('YYYYMMDD')}&time=${moment().format('HHmm00')}&tpm=REPORT_ONLY&its=CT|INTERNATIONAL,CT|TGV,CT|INTERCITE,CT|TER,CT|TRANSILIEN&un=true&livemapCallback=`, {headers:{Referer:'http://www.sncf.com/fr/geolocalisation'}})
    .then(({data:{svcResL:[{res:{common:{prodL,remL,locL},jnyL}}]}}) => read(jnyL, prodL, remL, locL, {lat, long}))

const realTimeRER = ({lat, long}) => get(`http://sncf-maps.hafas.de/carto/livemaps?service=journeygeopos&rect=${Math.floor(long * 1E6) - maxDistanceInRealTimeMap},${Math.floor(lat * 1E6) - maxDistanceInRealTimeMap},${Math.floor(long * 1E6) + maxDistanceInRealTimeMap},${Math.floor(lat * 1E6) + maxDistanceInRealTimeMap}&i=35000&is=10000&prod=27&date=${moment().format('YYYYMMDD')}&time=${moment().format('HHmm00')}&livemapCallback=`, {headers:{Referer:'http://www.sncf.com/fr/geolocalisation'}})
    .then(({data:{svcResL:[{res:{common:{prodL,remL,locL},jnyL}}]}}) => read(jnyL, prodL, remL, locL, {lat, long}))

const realTimeMap = ({stationCoords:{lat, long}}) => Promise.all([realTimeTrains({lat, long}), realTimeRER({lat, long})])
    .then(([trains, rer]) => trains.concat(rer))
    .then(trains => trains.map(train => {
        return {
            savedNumber: train.number,
            dataToDisplay: {
                status: train.names.includes('OnPlatform') && train.distance <= 0.4 ? 'à quai' :
                    train ? `< ${Math.ceil(train.distance)} km` : 'retardé'
            }
        }
    }))

export default {feed:[realTimeMap]}