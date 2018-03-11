const {get} = require('axios')
const DomParser = require('dom-parser')
const fs = require('fs')

const concat = (acc, value) => acc.concat(value)

const extractTable = (urlSuffix, filename) => get(`https://fr.wikipedia.org/wiki/Mod%C3%A8le:${urlSuffix}/couleur_fond`)
    .then(linesHtml => new DomParser().parseFromString(linesHtml.data).getElementsByClassName('wikitable').map(
        tbody => tbody.getElementsByTagName('tr')).reduce(concat, []).map(
        tr => tr.getElementsByTagName('td')).filter(node => node.length).map(
        node => {return {[node[0].childNodes[0].text ||
            node[0].childNodes[0].childNodes[1].text]:node[1].childNodes[0].childNodes[0].text.substring(1)}}).reduce(
        (acc, value) => Object.assign(acc, value),{}))
    .then(data => fs.writeFileSync(`src/core/data/${filename}LinesColors.json`, JSON.stringify(data)))


Promise.all([
    extractTable('M%C3%A9tro_de_Paris', 'metro'),
    extractTable('Tramway_d%27%C3%8Ele-de-France', 'tram'),
    extractTable('RER', 'rer'),
    extractTable('Transilien', 'transilien')])


