import proj4 from 'proj4'
import {get} from 'axios'
import moment from 'moment'
import promiseWhile from '../operations/promiseWhile'

const epsg102582 = '+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs'
const lookAround = [[0, 0],[-35, -35], [-35, 35], [35, -35], [35, 35]]

const stationSearch = (coords, {nestedStationSearch}) => Promise.resolve({coords, projection:proj4(epsg102582, [coords.long, coords.lat]), inMemoryData:nestedStationSearch(coords), lookAroundIndex: 0})
    .then(({coords, projection, inMemoryData, lookAroundIndex}) =>
        promiseWhile(response => (!response.data || response.data.type === 'Line' || !response.data.type) && lookAroundIndex < lookAround.length,
            () => get(`https://api.vianavigo.com/identify?x=${projection[0] + lookAround[lookAroundIndex][0]}&y=${projection[1] + lookAround[lookAroundIndex++][1]}&zoom=5&mapType=2&pixelValue=1.3229193125052918`, {headers: {'X-Host-Override':'vgo-api'}})
                .catch(e => Promise.resolve({data:[]})))
        .then(identification => Promise.resolve({coords, projection, identification:identification().data.data.map(oneIdentification => {return {...oneIdentification, id:oneIdentification.id, label:oneIdentification.labelNavitia||oneIdentification.streetName||inMemoryData.stationName}})})))


const baseDepartures = ({projection, identification}) => Promise.all(identification.map(oneIdentification =>
        get(`https://api.vianavigo.com/proximity?x=${projection[0]}&y=${projection[1]}&type=StopArea${oneIdentification.zipCode ? `&zipCode=${oneIdentification.zipCode}` : ''}${oneIdentification.id ? `&id=${oneIdentification.id}` : ''}&name=${oneIdentification.label}&nextPassages=true`, {headers: {'X-Host-Override':'vgo-api'}})
            .catch(e => {debugger;})))
        .then(values => values.map(value => value.data).map(value => value.proximityPoints.reduce((acc, value) =>
            acc.concat((value.nextPassages||[]).map(passage => {return {...value, ...(passage||{}), nextPassages:undefined}})), [])).reduce((acc, value) => acc.concat(value), []))
        .then(denormalizedDepartures => denormalizedDepartures.map(denormalizedDeparture => {
            const time = moment().add(parseInt(denormalizedDeparture.time), 'minutes').format('HH:mm')
            return {
                savedNumber:denormalizedDeparture.id,
                stop_date_time: {
                    base_departure_date_time: time,
                },
                dataToDisplay: {
                    mode: denormalizedDeparture.line.mode === 'Train' ? 'Transilien' : denormalizedDeparture.line.mode,
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