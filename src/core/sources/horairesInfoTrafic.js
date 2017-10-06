import {get, post} from 'axios'
import DomParser from 'dom-parser'

const readCookie = (response, name) => response.headers['set-cookie'].find(x => x.includes(name)).replace(/; HttpOnly/ig, '').replace(/; path=\//ig, '').replace(/; Domain=\.sncf\.com/ig, '')

const headersFrom = (infoRequest, redirect) => {return {headers:{
    Cookie: [readCookie(infoRequest, 'SNCCACHE'), readCookie(infoRequest, 'SNC_city'), readCookie(redirect.response, 'JSESSIONID'), readCookie(redirect.response, 'SNCSESSION')].join('; ')}}}

const read = (stationName) =>
    get('http://www.sncf.com/fr/horaires-info-trafic').then(infoRequest =>
        post(`http://www.sncf.com/sncf/gare`, `libelleGare=${stationName}`, {maxRedirects: 0}).catch(redirect =>
            get(`http://www.sncf.com${redirect.response.headers.location.replace('/sncf/..', '')}`, headersFrom(infoRequest, redirect))
                .then(response => new DomParser().parseFromString(response.data).getElementsByClassName('tab-depart')
                    .find(element => element.nodeName === 'ul').childNodes
                    .filter(childNode => childNode.nodeName !== '#text')
                    .map(childNode => [...childNode.childNodes.filter(subChildNode => subChildNode.nodeName !== '#text')
                        .map(subChildNode => subChildNode.childNodes
                            .map(subSubChildNode => {return {text: subSubChildNode.text, attributes: subSubChildNode.attributes, innerText: (subSubChildNode.childNodes||[]).map(subSubSubChildNode => subSubSubChildNode.text)}})
                            .filter(subSubChildNode => !subSubChildNode.text || !subSubChildNode.text.match(/^\s+$/)))])
                    .map(childNodes => {
                        return {
                            number: parseInt(childNodes["1"]["1"].attributes["2"].value),
                            dataToDisplay: {
                                mode: childNodes["2"]["0"].innerText["0"],
                                direction: (childNodes["1"]["0"].text || childNodes["1"]["0"].innerText["0"]).trim(),
                                number: childNodes["1"]["1"].attributes["2"].value,
                                time: (childNodes["0"]["0"].innerText["0"]||'').replace('h', ':'),
                                platform: childNodes["3"]["0"].text === '--' ? undefined : childNodes["3"]["0"].text,
                                stops: []}}}))
                    .then(partialData => post('http://www.sncf.com/fr/gare/ajax/getDessertesList', `numeroTrain=${partialData[0].dataToDisplay.number}`, headersFrom(infoRequest, redirect))
                        .then(train1Html => [{dataToDisplay:{...partialData[0].dataToDisplay,
                            stops:new DomParser().parseFromString(train1Html.data).getElementsByTagName('li')}},
                            ...partialData.slice(1)]))
                    .then(partialData => post('http://www.sncf.com/fr/gare/ajax/getDessertesList', `numeroTrain=${partialData[1].dataToDisplay.number}`, headersFrom(infoRequest, redirect))
                        .then(train2Html => [partialData[0], {dataToDisplay:{...partialData[1].dataToDisplay,
                            stops:new DomParser().parseFromString(train2Html.data).getElementsByTagName('li')}},
                            ...partialData.slice(2)]))))

export {read}