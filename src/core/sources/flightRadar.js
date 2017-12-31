import {get} from 'axios'
import airports from '../data/airports.json'
import moment from 'moment'

const stationSearch = (coords, {nestedStationSearch}) => 
    nestedStationSearch(coords, {stationsList: airports})

const baseDepartures = ({iataCodes:[code]}) => 
    get(`https://api.flightradar24.com/common/v1/airport.json?code=${code}&plugin[]=&plugin-setting[schedule][mode]=&plugin-setting[schedule][timestamp]=${moment().format('X')}&page=1&limit=100&token=`)
    .then(({data:{result:{response:{airport:{pluginData:{schedule:{departures:{data:content}}}}}}}}) => 
    content.map(row => row.flight))
    .then(flights => flights.map(flight => {
        const time = flight.time.real.departure || flight.time.scheduled.departure
        return {
        savedNumber: flight.identification.number.default,
        stop_date_time: {
            base_departure_date_time: '' + time,
        },
        dataToDisplay: {
            mode: `avion (${flight.aircraft.model.code})`,
            name: flight.airline.short,
            direction: (flight.airport.destination.name || '?')
                            .replace(' International Airport', '')
                            .replace(' Airport', '')
                            .replace(' Heliport', '')
                            .replace(' EuroAirport', ''),
            number: flight.identification.number.default,
            time: moment.unix(time).format('HH:mm'),
            boardingPoint: flight.airport.origin.info.terminal && 
                'Terminal ' + flight.airport.origin.info.terminal,
            platform: flight.airport.origin.info.gate,
            stops: []}}}))

export default {baseDepartures, stationSearch, feed:[],
    metadata:{
        features:['stations', 'departures'], everywhere: false,
        betterServedWith: [],
        ratings:{relevancy: 2, reliability: 4, sustainability: 4, efficiency: 3}
    }
}
