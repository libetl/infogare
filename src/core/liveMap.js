import {get} from 'axios'
import moment from 'moment'

const haversine = (coords1, coords2) => {
    const degreesToRadian = Math.PI / 180;
    const latDelta = (coords2.lat - coords1.lat) * degreesToRadian
    const longDelta = (coords2.long - coords1.long) * degreesToRadian
    const a = Math.sin(latDelta/2) * Math.sin(latDelta/2) +
        Math.cos(coords1.lat * degreesToRadian) * Math.cos(coords2.lat * degreesToRadian) *
        Math.sin(longDelta/2) * Math.sin(longDelta/2)
    return 12742 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

const maxDistanceInRealTimeMap = 50000

export default {
    thresholdBetweenTimeAndDistance: 5 /*minutes before departure*/,
    realTimeMap : ({lat, long}) => get(`http://sncf-maps.hafas.de/carto/livemaps?service=journeygeopos&rect=${Math.floor(long * 1E6) - maxDistanceInRealTimeMap},${Math.floor(lat * 1E6) - maxDistanceInRealTimeMap},${Math.floor(long * 1E6) + maxDistanceInRealTimeMap},${Math.floor(lat * 1E6) + maxDistanceInRealTimeMap}&i=35000&is=10000&prod=27&date=${moment().format('YYYYMMDD')}&time=${moment().format('HHmm00')}&tpm=REPORT_ONLY&its=CT|INTERNATIONAL,CT|TGV,CT|INTERCITE,CT|TER,CT|TRANSILIEN&un=true&livemapCallback=`, {headers:{Referer:'http://www.sncf.com/fr/geolocalisation'}})
        .then(({data:{svcResL:[{res:{common:{prodL,remL,locL},jnyL}}]}}) => {
            const data = jnyL
                .map(train => {return {...train, ...prodL[train.prodX], remarks:[...new Set(train.remL)].map(rem => {return {...rem, ...remL[rem.remX]}}),
                    lines:train.ani && [...new Set(train.ani.fLocX)].map(loc => locL[loc])}})
                .map(train => {return {...train, names:train.remarks.filter(r => r.code = 'FD').map(r => r.txtN)}})
                .map(train => {return {...train, number:(train.names.map(name => name.match(/\s+[0-9]+$/) && parseInt(name.match(/\s+[0-9]+$/)[0])) || [])[0]}})
                .map(train => {return {...train, distance:haversine({lat, long}, {lat:train.pos.y / 1E6, long:train.pos.x / 1E6})}})
            return Promise.resolve(data)
        })
}
