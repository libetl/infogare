const {get} = require('axios')
const DomParser = require('dom-parser')
const fs = require('fs')

const concat = (acc, value) => acc.concat(value)

const busLinesWikipediaUrls = [
    'https://fr.wikipedia.org/wiki/Lignes_de_bus_RATP_de_20_%C3%A0_99',
    'https://fr.wikipedia.org/wiki/Lignes_de_bus_RATP_de_100_%C3%A0_199',
    'https://fr.wikipedia.org/wiki/Lignes_de_bus_RATP_de_200_%C3%A0_299',
    'https://fr.wikipedia.org/wiki/Lignes_de_bus_RATP_de_300_%C3%A0_399',
    'https://fr.wikipedia.org/wiki/Lignes_de_bus_RATP_de_400_%C3%A0_499',
    'https://fr.wikipedia.org/wiki/Lignes_de_bus_RATP_de_500_%C3%A0_599',
    'https://fr.wikipedia.org/wiki/Lignes_de_bus_RATP_sp%C3%A9ciales']

Promise.all(busLinesWikipediaUrls.map(wikipediaUrl => get(wikipediaUrl)))
    .then(busLinesHtmls => busLinesHtmls.map(busLinesHtml =>
        new DomParser().parseFromString(busLinesHtml.data).getElementsByClassName('wikitable').map(
            tbody => tbody.getElementsByTagName('tr')).reduce(concat, []).map(
            tr => tr.getElementsByTagName('td')).reduce(concat, [])
            .filter(td => td.attributes.find(attribute => attribute.name === 'rowspan' && attribute.value === '4'))))
    .then(allLinesAccrossAllHtmlFiles => allLinesAccrossAllHtmlFiles.reduce(concat, []))
    .then(allTds => allTds.map(td => {
        return {
            line:td.getElementsByTagName('b')[0].childNodes[0].text,
            backgroundColor:td.attributes.find(attribute => attribute.name === 'style').value.match(/background-color:\s*(#[A-Fa-f0-9]+)/)[1],
            color:td.attributes.find(attribute => attribute.name === 'style').value.match(/.*[^A-Za-z\-]?color:\s*(#[A-Fa-f0-9]+)/)[1]}})
        .reduce((acc, value) => {return {...acc, [value.line]: {backgroundColor:value.backgroundColor, color:value.color}}}, []))
    .then(data => fs.writeFileSync('src/core/data/ratpBusColors.json', JSON.stringify(data)))

