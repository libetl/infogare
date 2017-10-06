import {get, post} from 'axios'
import {Html5Entities} from 'html-entities'
import moment from 'moment'
import DomParser from 'dom-parser'

const url = (uic, stationName, region, dateTime, number) => `https://www.ter.sncf.com/paca/gares/${uic}/${stationName}/detail?trainDate=${dateTime.format('MM[%2F]DD[%2F]YYYY[%2000%3A00%3A00]')}&trainNumber=${number}&stopType=Gare&cssTheme=color-garesetservices`

const findTerJourney = ({baseDepartures, stationsAreas, stationName}) => Promise.all(baseDepartures.map(departure =>
    baseDepartures.indexOf(departure) > 1 ? Promise.resolve({}) :
    get(url(parseInt(stationsAreas[0].fields.uic), stationsAreas[0].fields.intitule_gare,
        stationsAreas[0].fields.region, moment(), departure.savedNumber))
        .then(html => {
            const table = new DomParser().parseFromString(html.data).getElementsByClassName('train_depart_table')[0].childNodes.find(node => node.nodeName === 'tbody')
                .getElementsByTagName('a').map(a => Html5Entities.decode(a.childNodes[0].text.trim()))
            const stops = (table.indexOf(stationName) !== -1 ? table.slice(table.indexOf(stationName) + 1) : table)
                .map(name => name.replace(/ /g, '\u00a0').replace(/-/g, '\u2011').replace(/\//g, '\u00a0\u00a0\u00a0\u0338'))
            return {savedNumber: departure.savedNumber, dataToDisplay: {stops}}})))

export default {feed:[findTerJourney]}