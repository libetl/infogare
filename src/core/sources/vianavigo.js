import proj4 from 'proj4'
import {get} from 'axios'
import moment from 'moment'

const epsg102582 = '+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs'


const stationSearch = (coords) => Promise.resolve({coords, projection:proj4(epsg102582, [coords.long, coords.lat])})
    .then(({coords, projection}) => get(`https://api.vianavigo.com/identify?x=${projection[0]}&y=${projection[1]}&zoom=4&mapType=2&pixelValue=2.6458386250105836`, {headers: {'X-Host-Override':'vgo-api'}})
        .then(identification => Promise.resolve({coords, projection, identification})))


const baseDepartures = ({coords, projection, identification}) =>
    Promise.all(identification.data.data.map(oneIdentification => get(`https://api.vianavigo.com/proximity?x=${projection[0]}&y=${projection[1]}&id=${oneIdentification.id}&type=StopArea&name=${oneIdentification.labelNavitia}&nextPassages=true`, {headers: {'X-Host-Override':'vgo-api'}})))
        .then(values => Promise.resolve({coords, projection, identification:identification.data.data, values:values.map(value => value.data)}))
        .then(everything => everything.values.map(value => value.proximityPoints.reduce((acc, value) =>
            acc.concat((value.nextPassages||[]).map(passage => {return {...value, ...(passage||{}), nextPassages:undefined}})), [])).reduce((acc, value) => acc.concat(value), []))
        .then(denormalizedDepartures => denormalizedDepartures.map(denormalizedDeparture => {
            const time = moment().add(parseInt(denormalizedDeparture.time), 'minutes').format('hh:mm')
            return {
                savedNumber:denormalizedDeparture.id,
                stop_date_time: {
                    base_departure_date_time: time,
                },
                dataToDisplay: {
                    mode: denormalizedDeparture.line.mode,
                    direction: denormalizedDeparture.lineDirection,
                    number: denormalizedDeparture.line.label,
                    missionCode: denormalizedDeparture.vehicleName,
                    time: time,
                    stops: []
                }
            }}))

export default {
    stationSearch, baseDepartures,
    metadata: {features:['stations'], everywhere: true, butSpecificForRegion:'Île-de-France',
        ratings:{relevancy: 3, reliability: 3, sustainability: 3}}}