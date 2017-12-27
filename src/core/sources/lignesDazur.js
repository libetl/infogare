import {get, post} from 'axios'
import DomParser from 'dom-parser'
import moment from 'moment'

const webhost = 'https://www.lignesdazur.com'
const stopTimetable = `${webhost}/fr/horaires-a-larret/28/StopTimeTable/`

const stationSearch = ({lat, long}) => get(`${stopTimetable}searchfromlocation?latitude=${lat}&longitude=${long}`)
    .then(html => Promise.resolve(new DomParser().parseFromString(html.data).getElementsByTagName('select')[0]
        .childNodes.filter(node => node.nodeName === 'option')[0]))
    .then(option => {return {coords:{lat, long}, code: option.attributes[0].value, stationName: option.childNodes[0].text}})

const baseDepartures = ({code}) => get(`${stopTimetable}Search?LogicalId=${code}`)
        .then(html => new DomParser().parseFromString(html.data).getElementsByClassName('partner-lines-item')
            .map(elem => {return {
                links:
                    elem.getElementsByTagName('a').map(
                        aLink => {return {href: webhost + aLink.attributes.find(attribute => attribute.name === 'href').value,
                            text: aLink.childNodes[0].text}}),
                lineNumber:
                    (elem.getElementsByClassName('item-line-img')[0]||{attributes:[{name:'alt'}]}).attributes
                    .find(attribute => attribute.name === 'alt').value ||
                    elem.getElementsByClassName('item-line')[0].textContent}}))
        .then(lineNumbersAndLinks => Promise.all(lineNumbersAndLinks.map(ll => ll.links.map(link => link.href))
            .reduce((acc, value) => acc.concat(value), []).map(href => get(href)))
            .then(allHtmls => allHtmls
                .map(oneHtml => {return {href: webhost + oneHtml.request.path,
                    params: oneHtml.data.substring(oneHtml.data.indexOf('cityWay.timeTables.nextDeparture') + 33,
                        oneHtml.data.lastIndexOf(')</script>')).split(',').map(p => parseInt(p))}}))
            .then(citywayParams => {return {lineNumbersAndLinks, citywayParams}}))
        .then(citywayAndLineNumbers => citywayAndLineNumbers.lineNumbersAndLinks.map(lineNumberAndLinks =>
            lineNumberAndLinks.links.map(link => {return {destination: link.text,
                lineNumber: lineNumberAndLinks.lineNumber,
                params:citywayAndLineNumbers.citywayParams.find(paramsArray => paramsArray.href === link.href).params}}))
            .reduce((acc, value) => acc.concat(value), []))
        .then(lineNumbersWithParams => Promise.all(lineNumbersWithParams.map(
            entry => post(`${stopTimetable}NextDeparture`,
                `destinations={"1":"${encodeURIComponent(entry.destination)}"}&stopId=${entry.params[0]}` +
                `&lineId=${entry.params[1]}&sens=${entry.params[2]}`)))
            .then(allHtmls => allHtmls.map((html, index) => {return {...lineNumbersWithParams[index],
                response: new DomParser().parseFromString(html.data).getElementsByTagName('li')
                    .map(li => li.textContent.replace('<1', 'dans 1').replace('temps réel', '').trim())}})))
        .then(data => data.map(line => line.response.map(response => {
            const now = moment().format('HH:mm')
            const time = response.startsWith('dans ') ?
                moment().add(parseInt(response.match('[0-9]+')[0]), 'minutes').format('HH:mm') :
                response.substring(0, response.indexOf(' vers')).replace('h', ':')
            return {
                savedNumber: line.lineNumber + time + line.params[2],
                stop_date_time: {
                    base_departure_date_time: time.localeCompare(now) < 0 ? `${parseInt(time.split(':')[0]) + 24}:${time.split(':')[1]}` : time,
                },
                dataToDisplay: {
                    mode: line.lineNumber.match(/T[0-9]+/) ? 'tramway' : 'bus',
                    name: '',
                    direction: response.substring(response.indexOf('vers') + 5),
                    number: line.lineNumber,
                    time,
                    stops:[]}}})).reduce((acc, value) => acc.concat(value), []))


export default {stationSearch, baseDepartures, feed:[],
    metadata:{
        features:['stations', 'departures'], everywhere: false, butSpecificForRegion: 'Alpes-Maritimes',
        ratings:{relevancy: 2, reliability: 2, sustainability: 2, efficiency: 4,}
    }
}