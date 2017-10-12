import {get, post} from 'axios'
import {Html5Entities} from 'html-entities'
import moment from 'moment'
import DomParser from 'dom-parser'
import capitalize from '../operations/capitalize'

const stationUrl = (uic, stationName) => `https://www.ter.sncf.com/paca/gares/${uic}/${stationName}/prochains-departs`
const journeyUrl = (uic, stationName, region, dateTime, number) => `https://www.ter.sncf.com/paca/gares/${uic}/${stationName}/detail?trainDate=${dateTime.format('MM[%2F]DD[%2F]YYYY[%2000%3A00%3A00]')}&trainNumber=${number}&stopType=Gare&cssTheme=color-garesetservices`

const baseDepartures = ({inMemoryData:{stations}}) =>
    get(stationUrl(parseInt(stations[0].fields.uic), stations[0].fields.intitule_gare))
        .then(html => new DomParser().parseFromString(html.data)
            .getElementsByClassName('tableresultats')[0]
            .getElementsByTagName('tbody')[0]
            .getElementsByTagName('tr')
            .map(oneRow => {
                if (!oneRow.innerHTML.match('trainNumber=([0-9]+)')) return null
                const savedNumber = parseInt(oneRow.innerHTML.match('trainNumber=([0-9]+)')[1])
                const now = moment().add({minutes:-10}).format('HH:mm')
                const hour = oneRow.getElementsByClassName('hours')[0].childNodes[0].text.replace('h', ':')
                return {
                    savedNumber,
                    stop_date_time: {
                        base_departure_date_time: hour.localeCompare(now) < 0 ? `${parseInt(hour.split(':')[0]) + 24}:${hour.split(':')[1]}` : hour,
                    },
                    dataToDisplay: {
                        mode: Html5Entities.decode(oneRow.getElementsByClassName('mode')[0].childNodes[0].text.replace('Train ', '').replace(/^RER .*/, 'RER')),
                        name: oneRow.getElementsByClassName('mode')[0].childNodes[0].text.replace('Train ', '').split(' ')[1],
                        direction: Html5Entities.decode(capitalize(oneRow.getElementsByClassName('destination')[0].getElementsByTagName('a')[0] ?
                            oneRow.getElementsByClassName('destination')[0].getElementsByTagName('a')[0].childNodes[0].text :
                            oneRow.getElementsByClassName('destination')[0].childNodes[0].text.trim())),
                        number: oneRow.getElementsByClassName('number')[0].childNodes[0].text,
                        time: hour,
                        platform: oneRow.getElementsByClassName('voie').length > 0 ? oneRow.getElementsByClassName('voie')[0].childNodes[0].text.trim() : '',
                        stops: []

                    }
                }}).filter(departure => departure))

const findTerJourney = ({baseDepartures, stationsAreas:{inMemoryData:{stations}}, stationName}) => Promise.all(baseDepartures.map(departure =>
    baseDepartures.indexOf(departure) > 1 || !stations[0].fields ? Promise.resolve({}) :
        get(journeyUrl(parseInt(stations[0].fields.uic), stations[0].fields.intitule_gare,
            stations[0].fields.region, moment(), departure.savedNumber))
            .then(html => {
                if (html.data === '') return {savedNumber: departure.savedNumber, dataToDisplay: {stops:['Desserte\u00a0non\u00a0dispo']}}
                const table = new DomParser().parseFromString(html.data).getElementsByClassName('train_depart_table')[0].childNodes.find(node => node.nodeName === 'tbody')
                    .getElementsByTagName('a').map(a => Html5Entities.decode(a.childNodes[0].text.trim()))
                const stops = (table.indexOf(stationName) !== -1 ? table.slice(table.indexOf(stationName) + 1) : table)
                    .map(name => name.replace(/ /g, '\u00a0').replace(/-/g, '\u2011').replace(/\//g, '\u00a0\u00a0\u00a0\u0338'))
                return {savedNumber: departure.savedNumber, dataToDisplay: {stops}}})))

export default {baseDepartures, feed:[findTerJourney],
    metadata: {features:['departures', 'journeys','platforms','journeys'], everywhere: true,
        ratings:{relevancy: 5, reliability: 2, sustainability: 1}}}