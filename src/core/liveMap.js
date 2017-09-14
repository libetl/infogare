import {get, post} from 'axios'
import moment from 'moment'
import haversine from './haversine'

const maxDistanceInRealTimeMap = 50000
const thresholdBetweenTimeAndDistance = 5 /*minutes before departure*/

const read = (jnyL, prodL, remL, locL, {lat, long}) => jnyL
    .map(train => {return {...train, ...prodL[train.prodX], remarks:[...new Set(train.remL)].map(rem => {return {...rem, ...remL[rem.remX]}}),
        lines:train.ani && [...new Set(train.ani.fLocX)].map(loc => locL[loc])}})
    .map(train => {return {...train, names:train.remarks.filter(r => r.code = 'FD').map(r => r.txtN)}})
    .map(train => {return {...train, number:(train.names.map(name => name.match(/\s+[0-9]+$/) && parseInt(name.match(/\s+[0-9]+$/)[0])) || [])[0]}})
    .map(train => {return {...train, distance:haversine({lat, long}, {lat:train.pos.y / 1E6, long:train.pos.x / 1E6})}})

const realTimeMapV1 = ({lat,long}) => post('http://sncf-maps.hafas.de/bin/mgate.exe', {svcReqL:[{meth:'JourneyGeoPos',req: {maxJny:256,onlyRT:false,time:moment().format('HHmm00'),date:moment().format('YYYYMMDD'),rect:{llCrd: {x:Math.floor(long * 1E6) - maxDistanceInRealTimeMap,y:Math.floor(lat * 1E6) - maxDistanceInRealTimeMap}, urCrd:{x:Math.floor(long * 1E6) + maxDistanceInRealTimeMap,y:Math.floor(lat * 1E6) + maxDistanceInRealTimeMap}},perStep:10000,ageOfReport:true,jnyFltrL:[{type:'PROD',mode:'INC',value:'27'}],perSize:30000,trainPosMode:'CALC'}}],ext:'VBB.2',client:{id:'VBB',os:'iOS',type:'IPA',name:'vbbPROD',v:'3010600'},auth:{type:'AID',aid:'hafas-vbb-apps'},ver:'1.11'})
    .then(({data:{svcResL:[{res:{common:{prodL,remL,locL},jnyL}}]}}) => read(jnyL, prodL, remL, locL, {lat, long}))
const realTimeMap = ({lat, long}) => get(`http://sncf-maps.hafas.de/carto/livemaps?service=journeygeopos&rect=${Math.floor(long * 1E6) - maxDistanceInRealTimeMap},${Math.floor(lat * 1E6) - maxDistanceInRealTimeMap},${Math.floor(long * 1E6) + maxDistanceInRealTimeMap},${Math.floor(lat * 1E6) + maxDistanceInRealTimeMap}&i=35000&is=10000&prod=27&date=${moment().format('YYYYMMDD')}&time=${moment().format('HHmm00')}&its=CT|INTERNATIONAL,CT|TGV,CT|INTERCITE,CT|TER,CT|TRANSILIEN&un=true&livemapCallback=`, {headers:{Referer:'http://www.sncf.com/fr/geolocalisation'}})
    .then(({data:{svcResL:[{res:{common:{prodL,remL,locL},jnyL}}]}}) => read(jnyL, prodL, remL, locL, {lat, long}))

export {thresholdBetweenTimeAndDistance, realTimeMap}