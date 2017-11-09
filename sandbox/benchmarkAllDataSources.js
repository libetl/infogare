import webservice from '../src/core/webservice'
import places from '../src/core/data/places'
import chalk from 'chalk'

const {parisGaredeLyon} = places
const theContestants = {
    garesSncf:webservice.minimalMappingFor(['garesSncf', 'inMemory', 'liveMap']),
    horairesInfoTrafic:webservice.minimalMappingFor(['horairesInfoTrafic', 'inMemory', 'liveMap']),
    inMemory:webservice.minimalMappingFor(['inMemory']),
    liveMap:webservice.minimalMappingFor(['liveMap']),
    nouveauSncf:webservice.minimalMappingFor(['nouveauSncf', 'inMemory', 'liveMap']),
    raildar:webservice.minimalMappingFor(['raildar', 'inMemory']),
    sncfApi:webservice.minimalMappingFor(['sncfApi', 'inMemory', 'liveMap']),
    terSncf:webservice.minimalMappingFor(['terSncf', 'inMemory', 'liveMap']),
    transilien:webservice.minimalMappingFor(['transilien', 'inMemory']),
    vianavigo:webservice.minimalMappingFor(['vianavigo', 'inMemory']),
}

const timestamp = () => {const hrTime = process.hrtime(); return hrTime[0] * 1000000 + hrTime[1] / 1000}
const asNumbers = (name, duration) => `[${name.padStart(20)}]: ${`${(duration).toFixed(5)}`.padStart(15)} µs, ${`${((duration) / 1000).toFixed(0)}`.padStart(5)} ms, ${`${((duration) / 1000000).toFixed(2)}`.padStart(5)} s`

const asBar = (between0And1) => {
    const histogramDisplay = {width: 100.0, gradient: ['bgWhite', 'bgGreen', 'bgCyan', 'bgMagenta', 'bgRed']}
    const peak = between0And1 * histogramDisplay.width
    const interval = histogramDisplay.width / histogramDisplay.gradient.length
    return histogramDisplay.gradient.map(color => {return {color, threshold:histogramDisplay.gradient.indexOf(color) / histogramDisplay.gradient.length * histogramDisplay.width}})
        .filter(oneLevel => oneLevel.threshold <= peak)
        .map(oneLevel => chalk[oneLevel.color](new Array(Math.min(Math.round(peak - oneLevel.threshold), interval)).fill(' ').join(''))).join('')
}

const measureThemAll = (candidates, {from:station}) => Object.entries(candidates).map(([name, dataSourceByFeature]) =>
    previouslyFoundData => Promise.resolve(timestamp()).then(startTime =>
        webservice.nextDepartures(station, {token: process.env.TOKEN, dataSourceByFeature})
            .catch(e => console.log(`[${name.padStart(20)}]: ERROR (${e})`))
            .then(() => timestamp())
            .then(endTime => Promise.resolve({...previouslyFoundData, [name]:endTime - startTime}))))
    .reduce((acc, value) => acc.then(value), Promise.resolve({}))

const outputTheResultsAsHistogram = data => Object.entries(data).sort((a, b) => a[1] - b[1])
    .map(([name, duration], i, data) => asNumbers(name, duration) + ' ' + asBar(duration / data[data.length - 1][1]))
    .join('\n')

//ok, now that we are ready :
measureThemAll(theContestants, {from:parisGaredeLyon}).then(outputTheResultsAsHistogram).then(histogram => console.log(histogram))