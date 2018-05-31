import readDumps from '../gtfs/readDumps'
import {nearestTo, timetable, asDeparturesData} from '../gtfs/timetable'
import moment from 'moment'
import capitalize from '../operations/capitalize'

const gtfs = {}
const stationSearch = coords => ({coords, stationName: capitalize(nearestTo(coords, gtfs)[0].stop_name)})

const baseDepartures = data => asDeparturesData(timetable({gtfs, coordinates: data.coords,
    date: moment().format('YYYYMMDD'), time: moment().format('HH:mm:ss')}))

const init = () => gtfs.agency ? Promise.resolve(gtfs) : readDumps([
    'https://cors-anywhere.herokuapp.com/https://ressources.data.sncf.com/explore/dataset/sncf-ter-gtfs/files/24e02fa969496e2caa5863a365c66ec2/download/',
    'https://cors-anywhere.herokuapp.com/https://ressources.data.sncf.com/explore/dataset/sncf-intercites-gtfs/files/ed829c967a0da1252f02baaf684db32c/download/',
    'https://cors-anywhere.herokuapp.com/https://ressources.data.sncf.com/explore/dataset/sncf-transilien-gtfs/files/023d3733775238ae2e431e3613812bae/download/'])
    .then(result => Object.assign(gtfs, result))

export default ({stationSearch, baseDepartures, init, feed: [], metadata: {
        features: ['stations', 'departures', 'journeys'],
        betterServedWith: [],
        ratings: {relevancy: 1, reliability: 5, sustainability: 5, efficiency: 5}}})
