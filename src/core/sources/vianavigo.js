import places from '../data/places'

const montargis = {coords:places.montargis,plan:{x:630335.104272707,y:2334276.0456354255}}
const gisors = {coords:places.gisors,plan:{x:559861.2165140184,y:2476571.0989755313}}


const wgs84CoordsToPlanCoords = ({lat, long}) => {
    return {x:-(long - montargis.coords.long) * (gisors.plan.x - montargis.plan.x) + montargis.plan.x,
        y: (lat - montargis.coords.lat) * (gisors.plan.y - montargis.plan.y) + montargis.plan.y}}

const stationSearch = (coords) => {
    console.log(wgs84CoordsToPlanCoords(coords))
}

stationSearch(places.parisAusterlitz)

export default {
    stationSearch,
    metadata: {features:['stations'], everywhere: false,
        ratings:{relevancy: 3, reliability: 3, sustainability: 3}}}