import {get, post} from 'axios'
import DomParser from 'dom-parser'
import capitalize from '../operations/capitalize'
import moment from 'moment'

const idfStationUrl = 'https://www.transilien.com/fr/horaires/prochains-departs'
const fetchTransilien = s => post(idfStationUrl, `departure=${encodeURIComponent(s.name)}&uicDestination=&destination=&uicDeparture=${s.uic.replace(/^0+/, '').slice(0, -1)}`, {headers:{'Content-Type':'application/x-www-form-urlencoded'}})

const flatten = data => data.childNodes.filter(x=>!x.text||!x.text.match(/^\s*$/)).map(x=>x.text?x.text.trim():flatten(x)).reduce((acc, value)=>acc.concat(value),[])
const transilien = html => new DomParser().parseFromString(html.data)
    .getElementsByClassName('next-departure-result').map(result => flatten(result).filter(x=>!['Destination', 'Voir les arrêts', 'Gares Desservies', 'FERMER'].includes(x)))
    .map(result=>result[0].toUpperCase() === 'TRAIN' ? ['Transilien',...result.slice(1)] : result)
    .map(result=>result[5] === 'Voie --' ? [...result.slice(0, 5), '', ...result.slice(5)] : result)
    .map(result=>[result[0].toUpperCase(), result[1].substring(result[1].indexOf('-')+1).toUpperCase(), ...result.slice(2)])
    .map((result,i)=> {
        const now = moment().format('HH:mm')
        if (result[1].match(/^[0-9]{2}:[0-9]{2}$/)) {
            const hour = result[1]
            return {
                savedNumber: result[0] + i,
                stop_date_time: {
                    base_departure_date_time: hour.localeCompare(now) < 0 ? `${parseInt(hour.split(':')[0]) + 24}:${hour.split(':')[1]}` : hour,
                },
                dataToDisplay: {
                    platform: result[2].match(/^[0-9]*$/) ? result[2] : result[3],
                    direction: capitalize(result[2].match(/^[0-9]*$/) ? 'Inconnue' : result[2]),
                    time: result[1],
                    missionCode: result[0],
                    stops: []
                }
            }
        }
        const hour = result[3]
        return {
            savedNumber:result[2]+i,
            stop_date_time: {
                base_departure_date_time: hour.localeCompare(now) < 0 ? `${parseInt(hour.split(':')[0]) + 24}:${hour.split(':')[1]}` : hour,
            },
            dataToDisplay: {
                mode: result[0],
                name: result[1],
                direction: capitalize(result[4]).replace('Gare De ', '').replace('Gare D\' ', ''),
                number: result[2],
                missionCode: result[2],
                time: result[3],
                platform: result[5],
                stops: result.slice(7).map(stop=>capitalize(stop).replace('Gare De ', '').replace('Gare D\' ', ''))
            }}})

const baseDepartures = ({nestedSearchData:{stations}}) =>
    Promise.all(stations.map(station => fetchTransilien(station).then(html => transilien(html)))).then(departuresArray => departuresArray.reduce((acc, value) => acc.concat(value), []))



export default {baseDepartures,
    metadata: {features:['departures', 'journeys','platforms'], everywhere: true, butSpecificForRegion:'Île-de-France',
        needsExtraSourceForGeolocation: false, betterServedWith: ['inMemory'],
        ratings:{relevancy: 4, reliability: 2, sustainability: 1, efficiency: 1}}}