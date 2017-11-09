import {get, post} from 'axios'
import moment from 'moment'
import DomParser from 'dom-parser'
import capitalize from '../operations/capitalize'
import promiseWhile from '../operations/promiseWhile'

const readCookie = (response, name) => response.headers['set-cookie'].find(x => x.includes(name)).replace(/; HttpOnly/ig, '').replace(/; path=\//ig, '').replace(/; Domain=\.sncf\.com/ig, '')

const headersFrom = (infoRequest, redirect) => {return {headers:{
    Cookie: [readCookie(infoRequest, 'SNCCACHE'), readCookie(infoRequest, 'SNC_city'), readCookie(redirect.response, 'JSESSIONID'), readCookie(redirect.response, 'SNCSESSION')].join('; ')}}}

const baseDepartures = ({nestedSearchData:{stations}}) => get('http://www.sncf.com/fr/horaires-info-trafic').then(infoRequest =>
        promiseWhile(response => !response.data.includes('Error 404 - Page not found') &&
            new DomParser().parseFromString(response.data).getElementsByClassName('tab-depart').length === 0,
            () => post(`http://www.sncf.com/sncf/gare`, `libelleGare=${stations[0].fields.intitule_gare.toLowerCase().replace(/[^a-z]/g, '-')}`, {maxRedirects: 0}).catch(redirect =>
                get(`http://www.sncf.com${redirect.response.headers.location.replace('/sncf/..', '')}`, headersFrom(infoRequest, redirect))))
                .then(response => response().data.includes('Error 404 - Page not found') ? [] :
                    new DomParser().parseFromString(response().data).getElementsByClassName('tab-depart')
                    .find(element => element.nodeName === 'ul').childNodes
                    .filter(childNode => childNode.nodeName !== '#text')
                    .map(childNode => [...childNode.childNodes.filter(subChildNode => subChildNode.nodeName !== '#text')
                        .map(subChildNode => subChildNode.childNodes
                            .map(subSubChildNode => {return {text: subSubChildNode.text, attributes: subSubChildNode.attributes, innerText: (subSubChildNode.childNodes||[]).map(subSubSubChildNode => subSubSubChildNode.text)}})
                            .filter(subSubChildNode => !subSubChildNode.text || !subSubChildNode.text.match(/^\s+$/)))])
                    .map(childNodes => {
                        const now = moment().add({minutes:-10}).format('HH:mm')
                        const hour = (childNodes["0"]["0"].innerText["0"]||'').replace('h', ':')
                        return {
                            savedNumber: parseInt(childNodes["1"]["1"].attributes["2"].value),
                            stop_date_time: {
                                base_departure_date_time: hour.localeCompare(now) < 0 ? `${parseInt(hour.split(':')[0]) + 24}:${hour.split(':')[1]}` : hour,
                            },
                            dataToDisplay: {
                                mode: childNodes["2"]["0"].innerText["0"],
                                direction: capitalize(childNodes["1"]["0"].text || childNodes["1"]["0"].innerText["0"]).trim(),
                                number: childNodes["1"]["1"].attributes["2"].value,
                                time: (childNodes["0"]["0"].innerText["0"]||'').replace('h', ':'),
                                platform: childNodes["3"]["0"].text === '--' ? undefined : childNodes["3"]["0"].text,
                                stops: []}}})))

export default {baseDepartures, feed:[], metadata: {features: ['departures'], everywhere: false,
    ratings:{relevancy: 2, reliability: 2, sustainability: 1, efficiency: 0}}}