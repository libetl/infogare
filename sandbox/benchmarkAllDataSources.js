import webservice from '../src/core/webservice'
import places from '../src/core/data/places'
import sources from '../src/core/sources'
import chalk from 'chalk'

const {parisGaredeLyon} = places
const theContestants = Object.keys(sources).map(source =>
    sources[source].metadata.needsExtraSourceForGeolocation ?
        {[source]:webservice.minimalMappingFor([source, 'inMemory', 'liveMap'])} :
        {[source]:webservice.minimalMappingFor([source, 'inMemory'])})
    .reduce((acc, value) => {return {...acc, ...value}}, {})

const timestamp = () => {const hrTime = process.hrtime(); return hrTime[0] * 1000000 + hrTime[1] / 1000}
const asNumbers = (name, duration) => `[${name.padStart(20)}]: ${`${(duration).toFixed(5)}`.padStart(15)} µs, ${`${((duration) / 1000).toFixed(0)}`.padStart(5)} ms, ${`${((duration) / 1000000).toFixed(2)}`.padStart(5)} s`

const asBar = (between0And1, histogramDisplay = {width: 100.0, gradient: ['bgWhite', 'bgGreen', 'bgCyan', 'bgMagenta', 'bgRed']}) => {
    const peak = between0And1 * histogramDisplay.width
    const interval = histogramDisplay.width / histogramDisplay.gradient.length
    return histogramDisplay.gradient.map(color => {return {color, threshold:histogramDisplay.gradient.indexOf(color) / histogramDisplay.gradient.length * histogramDisplay.width}})
        .filter(oneLevel => oneLevel.threshold <= peak)
        .map(oneLevel => chalk[oneLevel.color](new Array(Math.min(Math.round(peak - oneLevel.threshold), interval)).fill(' ').join(''))).join('')
}

const measureThemAll = (candidates, {from:station, howManyTimes}) =>
    new Array(howManyTimes)
        .fill(Object.entries(candidates))
        .reduce((acc, value) => acc.concat(value), [])
        .map(([name, dataSourceByFeature]) =>
    previouslyFoundData => Promise.resolve(timestamp()).then(startTime =>
        webservice.nextDepartures(station, {token: process.env.TOKEN, dataSourceByFeature})
            .catch(e => console.log(`[${name.padStart(20)}]: ERROR (${e})`))
            .then(() => timestamp())
            .then(endTime => Promise.resolve({...previouslyFoundData, [name]:[...(previouslyFoundData[name]||[]), endTime - startTime].sort()}))))
    .reduce((acc, value) => acc.then(value), Promise.resolve({}))
        .then(data => Object.entries(data).map(([key, value]) => {return {[key]: value[Math.round(howManyTimes / 2)]}}).reduce((acc, value) => {return {...acc, ...value}}))
const outputTheResultsAsHistogram = data => Object.entries(data).sort((a, b) => a[1] - b[1])
    .map(([name, duration], i, data) => asNumbers(name, duration) + ' ' + asBar(duration / data[data.length - 1][1]))
    .join('\n')
const logThat = data => console.log(data)

//ok, now that we are ready :
measureThemAll(theContestants, {from:parisGaredeLyon, howManyTimes:10}).then(outputTheResultsAsHistogram).then(logThat)
