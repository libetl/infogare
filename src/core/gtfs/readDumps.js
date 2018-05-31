const {get} = require('axios')
const unzip = require('yauzl')
const fs = require('fs')
const eventStream = require('event-stream')

const keys = {
    agency: ['agency_id'],
    stops: ['stop_id'],
    calendar: ['service_id'],
    calendar_dates: ['date', 'service_id'],
    routes: ['route_id'],
    trips: ['trip_id']
}

const filteredProperties = {
    agency: ['agency_id', 'agency_name', 'agency_timezone'],
    calendar: ['service_id', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'start_date', 'end_date'],
    calendar_dates: ['service_id', 'date', 'exception_type'],
    routes: ['agency_id', 'route_id', 'route_long_name', 'route_short_name', 'text'],
    stops: ['stop_id', 'stop_lat', 'stop_lon', 'stop_name', 'parent_station'],
    stop_times: ['arrival_time', 'departure_time', 'stop_id', 'stop_sequence', 'trip_id'],
    transfers: ['from_stop_id', 'to_stop_id', 'transfer_type', 'min_transfer_time'],
    trips: ['route_id', 'service_id', 'trip_id', 'trip_headsign', 'trip_short_name', 'direction_id'],
    fare_attributes: [],
    fare_rules: [],
    shapes: [],
    frequencies: [],
    feed_info: []
}

const indexInLatLong = (acc, value, {lat = value.stop_lat, long = value.stop_lon}) => {
    const index = ('' + Math.trunc(lat * 100)).padStart(5) + ',' + ('' + Math.trunc(long * 100)).padStart(5)
    const previousValue = acc[index]
    return Object.assign(acc, previousValue ? {[index]: previousValue.concat(value)} : {[index]: [value]})
}

const nestData = (result, tableName, primaryKeyId, newValue) => {
    let parentTable = result[tableName]
    let table = result[tableName]
    let savedKey = primaryKeyId
    for (let key of primaryKeyId || []) {
        savedKey = key
        parentTable = table
        const newEntry = {[newValue[key]]: []}
        if (key !== primaryKeyId[primaryKeyId.length - 1]) parentTable.push(newEntry)
        table = Object.values(newEntry)[0]
    }
    return parentTable.push(savedKey ? {[newValue[savedKey]]: newValue} : newValue)
}

const reduceArrays = entry => ({[entry[0]]: entry[1].reduce((acc, value) => {
        const propertyName = Object.entries(value)[0][0]
        const propertyValue = Object.entries(value)[0][1]

        if (Array.isArray(propertyValue) && Object.keys(propertyValue[0]).length === 1) {
            const smallerEntry = Object.entries(propertyValue[0])[0]
            return Object.assign(acc, {[propertyName]: Object.assign(acc[propertyName] || {},
                    reduceArrays([smallerEntry[0], [smallerEntry[1]]]))})
        }

        if(typeof propertyValue === 'string') {
            return Object.assign(acc, value)
        }

        return Object.assign(acc, {[propertyName]:
                acc[propertyName] && acc[propertyName].length ? acc[propertyName].concat(propertyValue) :
                    acc[propertyName] ? [acc[propertyName], propertyValue] :
                        propertyValue})}, {})})

const asStream = data => global.window ? new Buffer(new Uint8Array(data)) : data


const urlToDataStructure = url => {
    let result = {}
    return (url.startsWith('http') ? get(url, {responseType: 'arraybuffer'}).then(({data}) => asStream(data)) :
        new Promise(resolve => fs.readFile(url, (err, data) => resolve(data))))
        .then(buffer => new Promise(resolve => unzip.fromBuffer(buffer, {lazyEntries: true},
            (err, zipfile) => {
                if (err) throw err
                zipfile.readEntry()
                zipfile.on('entry', entry =>
                    zipfile.openReadStream(entry, (err, oneEntry) => {
                        if (err) throw err
                        oneEntry.on('end', () => zipfile.readEntry())
                        oneEntry.pipe(eventStream.split())
                            .pipe(eventStream.map((data, callback) => {
                                const splitData = data.split(',').map(cell => cell.replace(/^['"](.*)['"]/, '$1'))
                                const tableName = entry.fileName.replace('.txt', '')
                                const primaryKeyId = keys[tableName]
                                const newValue = (result[entry.fileName] || []).map((label, i) => ({[label]: splitData[i]}))
                                    .reduce((acc, value) => filteredProperties[tableName].includes(Object.keys(value)[0]) ?
                                        Object.assign(acc, value) : acc, {})

                                if (!result[entry.fileName]) return Object.assign(result, {[entry.fileName]: splitData}, {[tableName]: []})

                                return nestData(result, tableName, primaryKeyId, newValue) && callback()
                            }))
                    }))
                zipfile.on('end', () => resolve(result))
            })))
        .then(data => Object.entries(data).reduce((acc, value) => Object.assign(acc, value[0].endsWith('.txt') ? {} :
            !keys[value[0]] ? {[value[0]]:value[1]} :
                reduceArrays(value)), {}))
        .then(data => Object.assign(data,
            {stop_times_by_stop_id: data.stop_times.reduce((acc, stopTime) =>
                    Object.assign(acc, {[stopTime.stop_id]:(acc[stopTime.stop_id]||[]).concat(stopTime)}), {}),
                stop_times_by_trip_id: data.stop_times.reduce((acc, stopTime) =>
                    Object.assign(acc, {[stopTime.trip_id]:(acc[stopTime.trip_id]||[]).concat(stopTime)}), {})}))
        .then(data => Object.assign(data,
            {stops_by_lat_long: Object.values(data.stops).reduce((acc, value) =>
                    indexInLatLong(
                        indexInLatLong(
                            indexInLatLong(
                                indexInLatLong(
                                    indexInLatLong(acc, value, {lat: parseFloat(value.stop_lat), long: parseFloat(value.stop_lon)})
                                    , value, {lat: parseFloat(value.stop_lat) + 0.01, long: parseFloat(value.stop_lon)})
                                , value, {lat: parseFloat(value.stop_lat), long: parseFloat(value.stop_lon) + 0.01})
                            , value, {lat: parseFloat(value.stop_lat) - 0.01, long: parseFloat(value.stop_lon)})
                        , value, {lat: parseFloat(value.stop_lat), long: parseFloat(value.stop_lon) - 0.01}), {})}))
}


const mergeDatasets = datasets => datasets.reduce((result, dataset) =>
    Object.keys(dataset).map(file => !result[file] ? {[file]: dataset[file]} :
        Array.isArray(dataset[file]) ? {[file]: result[file].concat(dataset[file])} :
            {[file]: Object.assign(result[file], dataset[file])}).reduce((acc, value) => Object.assign({}, acc, value)), {})

module.exports = zips => Promise.all(zips.map(urlToDataStructure)).then(mergeDatasets)
