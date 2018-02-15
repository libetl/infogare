import {get} from 'axios'
import moment from 'moment'

const baseDepartures = ({stationCoords: coordinates}) =>
    get(`https://train-schedules-server.herokuapp.com/coords/${coordinates.lat},${coordinates.long}/date/${moment().format('YYYYMMDD')}/time/${moment().format('HH:mm:ss')}`)
        .then(({data:{departures}}) => departures)

export default {baseDepartures, feed:[], metadata: {features: ['departures', 'geolocation', 'journeys'], everywhere: false,
        betterServedWith: ['inMemory'],
        ratings:{relevancy: 1, reliability: 5, sustainability: 5, efficiency: 5}}}
