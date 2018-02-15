const { get } = require('axios')
const unzip = require('unzip2')
const fs = require('fs')
const download = require('download')
const stream = require('stream')
const event = require('events')
const es = require('event-stream')

const datasets = 'https://ressources.data.sncf.com/explore/dataset/'
const gares = `${datasets}referentiel-gares-voyageurs/download/?format=json&timezone=Europe/Berlin`
const idfUrls = [
    `${datasets}sncf-transilien-gtfs/files/f1a8e58126fbe2f67dd0512ef74a1124/download/`,
    `${datasets}sncf-transilien-gtfs/files/023d3733775238ae2e431e3613812bae/download/`]
//const garesRatp = 'https://data.ratp.fr/explore/dataset/positions-geographiques-des-stations-du-reseau-ratp/download/?format=json&timezone=Europe/Berlin'
const zipEntryEmitter = new event.EventEmitter
const writeMappingEmitter = new event.EventEmitter

const asStream = (data) => {
    const passThrough = new stream.PassThrough
    passThrough.end(data)
    return passThrough
}

const getSingleFileFromWebZips = (urls, files, dests) => {
    const resultData = new Array(files.length).fill(0).map(() => {return {filesRead : 0, mappings:{}, lineMappings:{}, urls, dest:''}})
    urls.map(url => download(url).then(data => asStream(data).pipe(unzip.Parse()).on('entry', entry => {
            if(files.indexOf(entry.path) !== -1) resultData[files.indexOf(entry.path)].dest = dests[files.indexOf(entry.path)]
            files.indexOf(entry.path) !== -1 ? zipEntryEmitter.emit('fileFound', entry, resultData[files.indexOf(entry.path)]) :
                entry.autodrain()})))}

zipEntryEmitter.on('fileFound', (entry, resultData) =>
    entry.pipe(es.split())
        .pipe(es.map((data, callback) => {
            const result = data.match(/(DUA[0-9]+),[0-9]+,DUASN([0-9]{6})F[0-9]{5}-[0-9]_[0-9]{6},"([A-Z]{4})",[01],/)
            if (result) {
                writeMappingEmitter.emit('trainMapping', resultData, {code: result[1], number:result[2], mission: result[3]})
            }
            const lineResult =
                data.match(/(DUA[0-9]+),DUA[0-9]+,"([^"]+)","[^"]+","",[^,]*,,([0-9a-fA-F]{6}),[0-9a-fA-F]{6}/)
            if (lineResult) {
                writeMappingEmitter.emit('lineMapping', resultData, {code: lineResult[1], line:lineResult[2], color:lineResult[3]})
            }
            callback()
        })).on('end', () =>
        writeMappingEmitter.emit('endOfFile', resultData)))

writeMappingEmitter.on('trainMapping', (data, oneMapping) => {
    data.mappings[oneMapping.number] = oneMapping.mission
    data.lineMappings[oneMapping.number] = oneMapping.code
})

writeMappingEmitter.on('lineMapping', (data, oneMapping) => {
    data.mappings[oneMapping.line] = oneMapping.color
    data.lineMappings[oneMapping.code] = oneMapping.line
})

writeMappingEmitter.on('endOfFile', data => {
    data.filesRead++
    if (data.filesRead === data.urls.length) {
        fs.writeFile(data.dest, JSON.stringify(data.mappings), () => {})
        fs.writeFile(data.dest.replace('.json', '-lines.json'), JSON.stringify(data.lineMappings), () => {})
    }
})

getSingleFileFromWebZips(idfUrls, ['trips.txt', 'routes.txt'], ['./src/core/data/idfMapping.json', './src/core/data/routes.json'])
get(gares).then(sncf =>
    //get(garesRatp).then(ratp =>
   {
    const smallStationList =
        /*ratp.data.map(station => {
            return {coordinates:station.geometry.coordinates, tvs:station.fields.stop_id,
                name:station.fields.stop_name, uic:station.fields.stop_id}}).concat(*/
        sncf.data.filter(station => station.geometry && station.fields.tvs).map(station => {
        return {coordinates:station.geometry.coordinates, region:station.fields.agence_gare,
            tvs:station.fields.tvs, name:station.fields.intitule_gare, uic:station.fields.uic}})
        //)
    fs.writeFileSync('./src/core/data/stations.json', JSON.stringify(smallStationList))
    fs.writeFileSync('./src/core/data/places.js',
            'module.exports = ' + JSON.stringify(smallStationList.map(station => {return {name:station.name
                .replace(/[àâ]/g, 'a').replace(/[éèêë]/g, 'e').replace(/î/g, 'i').replace(/ô/g, 'o').replace(/[ùûü]/g, 'u')
                .replace(/[^a-zA-Z]/g, '').replace(/^./, station.name[0].toLowerCase()),
                coordinates: {lat: station.coordinates[1], long: station.coordinates[0]}}}).reduce((a, b) =>
                ((a[b.name] = b.coordinates) && a), {})))})
//)
