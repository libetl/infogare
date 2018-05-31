const readDumps = require('../src/core/gtfs/readDumps')
const haversine = require('../src/core/operations/haversine')
const {nearestTo, timetable, asDeparturesData} = require('../src/core/gtfs/timetable')
const moment = require('moment')
const express = require('express')

const sources = [
    'https://ressources.data.sncf.com/explore/dataset/sncf-ter-gtfs/files/24e02fa969496e2caa5863a365c66ec2/download/',
    'https://ressources.data.sncf.com/explore/dataset/sncf-intercites-gtfs/files/ed829c967a0da1252f02baaf684db32c/download/',
    'https://ressources.data.sncf.com/explore/dataset/sncf-transilien-gtfs/files/023d3733775238ae2e431e3613812bae/download/']

const gtfs = {}
const app = express()

app.get('/coords/:coords', ({params:{coords}}, res) => {
    const coordinates = {lat: parseFloat(coords.split(',')[0]), long: parseFloat(coords.split(',')[1])}
    const stopPoints = nearestTo(coordinates, gtfs)
    const date = moment().format('YYYYMMDD')
    const time = moment().format('HH:mm:ss')
    const distanceKilometers = stopPoints[0] && haversine(coordinates,
        {lat: parseFloat(stopPoints[0].stop_lat), long: parseFloat(stopPoints[0].stop_lon)})
    res.set('Content-Type', 'application/json')
    res.send({departures: asDeparturesData(timetable({gtfs, stopPoints,
        date, time})), stationName: stopPoints[0].stop_name, date, time, distanceKilometers})})

app.get('/coords/:coords/date/:date', ({params:{coords, date}}, res) => {
    const coordinates = {lat: parseFloat(coords.split(',')[0]), long: parseFloat(coords.split(',')[1])}
    const stopPoints = nearestTo(coordinates, gtfs)
    const distanceKilometers = stopPoints[0] && haversine(coordinates,
        {lat: parseFloat(stopPoints[0].stop_lat), long: parseFloat(stopPoints[0].stop_lon)})
    res.set('Content-Type', 'application/json')
    res.send({departures: asDeparturesData(timetable({gtfs, stopPoints, date})),
        stationName: stopPoints[0].stop_name, date, time: '00:00:00', distanceKilometers})})

app.get('/coords/:coords/date/:date/time/:time', ({params:{coords, date, time}}, res) => {
    const coordinates = {lat: parseFloat(coords.split(',')[0]), long: parseFloat(coords.split(',')[1])}
    const stopPoints = nearestTo(coordinates, gtfs)
    const distanceKilometers = stopPoints[0] && haversine(coordinates,
        {lat: parseFloat(stopPoints[0].stop_lat), long: parseFloat(stopPoints[0].stop_lon)})
    res.set('Content-Type', 'application/json')
    res.send({departures: asDeparturesData(timetable({gtfs, stopPoints, date, time})),
        stationName: stopPoints[0].stop_name, date, time, distanceKilometers})})

app.get('/update', (options, res) => readDumps(sources).then(updatedGtfs => {
    const freshness = moment().format('YYYY-MM-DDTHH:mm:ss')
    Object.assign(gtfs, updatedGtfs, {freshness})
    res.set('Content-Type', 'application/json')
    res.send({status: 'done', newFreshness: freshness})}))

app.get('/freshness', (options, res) => res.set('Content-Type', 'application/json') &&
    res.send({freshness: gtfs.freshness || 'no data read yet',
        links:{update: '/update'}}))

app.get('/', (options, res) => res.set('Content-Type', 'application/json') &&
    res.send({links:{update: '/update',
            freshness: '/freshness',
            nextDeparturesAndArrivals : '/coords/{lat},{long}',
            schedulesByDayAtStation : '/coords/{lat},{long}/date/{YYYYMMDD}',
            schedulesBetweenDateTimeAndMidnightAtStation :
                '/coords/{lat},{long}/date/{YYYYMMDD}/time/{HH}:{mm}:{ss}'}}))

app.listen(8080, () => console.log('Train schedule server on port 8080'))

setInterval(() => readDumps(sources)
    .then(updatedGtfs => Object.assign(gtfs, updatedGtfs,
        {freshness: moment().format('YYYY-MM-DDTHH:mm:ss')})), 3600000)
