import {get, post} from 'axios'
import DomParser from 'dom-parser'
import moment from 'moment'
import curlify from 'request-as-curl'

const defaultHeaders = {
    Host: ' www.sncf.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:55.0) Gecko/20100101 Firefox/55.0',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'fr-FR,fr;q=0.8,en-US;q=0.5,en;q=0.3',
    'Accept-Encoding': 'gzip, deflate',
    DNT: 1,
    Connection: 'keep-alive',
    'Upgrade-Insecure-Requests': 1,
    'Cache-Control': 'max-age=0'
}

const read = (stationName) =>
    get('http://www.sncf.com/fr/horaires-info-trafic', defaultHeaders).then(response =>
        post(`http://www.sncf.com/sncf/gare`, `libelleGare=${stationName}`, {maxRedirects:0, headers:{...defaultHeaders, Referer:'http://www.sncf.com/fr/horaires-info-trafic', 'Content-Type': 'application/x-www-form-urlencoded'}})
        .catch(redirect => get(`http://www.sncf.com${redirect.response.headers.location.replace('/sncf/..', '')}`, {headers:{...defaultHeaders,
            Referer: `http://www.sncf.com${redirect.response.headers.location.replace('/sncf/..', '')}`,
            Cookie: Array.from(new Set([...response.headers['set-cookie'].filter(x => x.includes('SNCCACHE')), ...redirect.response.headers['set-cookie'], 'has_js=1', `Date1stVisit=${encodeURIComponent(moment().format('ddd MMM DD YYYY HH:mm:ss'))}%20GMT+0200%20%28CEST%29`, 'cookieEnabled=OK', 'trackEnabled=0'])).join('; ').replace(/ HttpOnly;/ig, '').replace(/ path=\/;/ig, '').replace(/ Domain=\.sncf\.com;/ig, '')}})))
    .then(response => {
        return new DomParser().parseFromString(response.data).getElementsByClassName('tab-depart')
            .find(element => element.nodeName === 'ul').childNodes
            .filter(childNode => childNode.nodeName !== '#text')
            .map(childNode => [...childNode.childNodes.filter(subChildNode => subChildNode.nodeName !== '#text')
                .map(subChildNode => subChildNode.childNodes
                    .map(subSubChildNode => {return {text: subSubChildNode.text, attributes: subSubChildNode.attributes, innerText: (subSubChildNode.childNodes||[]).map(subSubSubChildNode => subSubSubChildNode.text)}})
                    .filter(subSubChildNode => !subSubChildNode.text || !subSubChildNode.text.match(/^\s+$/)))])
            .map(childNodes => {
                return {
                    dataToDisplay: {
                        mode: childNodes["2"]["0"].innerText["0"],
                        direction: (childNodes["1"]["0"].text || childNodes["1"]["0"].innerText["0"]).trim(),
                        number: parseInt(childNodes["1"]["1"].attributes["2"].value),
                        time: (childNodes["0"]["0"].innerText["0"]||'').replace('h', ':'),
                        platform: childNodes["3"]["0"].text === '--' ? undefined : childNodes["3"]["0"].text,
                        stops: []
                    }}})})

export {read}