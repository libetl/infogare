import {get} from 'axios'
import moment from 'moment'
import capitalize from '../operations/capitalize'

const garesSncfDeparturesUrl = (tvs) => `https://www.gares-sncf.com/fr/train-times/${tvs.toUpperCase()}/departure`

const fetchApi = tvsList => Promise.all((tvsList||[]).map(tvs => get(garesSncfDeparturesUrl(tvs))))
    .then(results => results.reduce((acc, value) => acc.concat(value.data.trains || []), []))

const baseDepartures = ({iataCodes:tvsList}) => fetchApi(tvsList)
    .then(trains => trains.map(train => {
        const now = moment().format('HH:mm')
        return {
        savedNumber: parseInt(train.num),
        stop_date_time: {
            base_departure_date_time: train.heure.localeCompare(now) < 0 ?
                `${parseInt(train.heure.split(':')[0]) + 24}:${train.heure.split(':')[1]}` : train.heure
        },
        dataToDisplay: {
            mode: (train.type||'').split(' ')[0],
            direction: capitalize(train.origdest),
            name: '',
            color: '000000',
            number: train.num,
            status: train.infos,
            miscStatus: train.etat,
            time: train.heure,
            delay: train.retard,
            stops:[]
        }
    }}))

const getGaresSncfPlatforms = ({baseDepartures, stationsAreas:{iataCodes:tvsList}}) => baseDepartures.filter(row => row.dataToDisplay.platform).length ? [] : fetchApi(tvsList).then(trains =>
        trains.map(train => {return {
            savedNumber: parseInt(train.num),
            dataToDisplay: {
                platform: train.voie,
                miscStatus: train.etat,
                delay: train.retard
            }
        }
    }))

export default {baseDepartures, feed:[getGaresSncfPlatforms],
    metadata:{
        features:['departures', 'platforms'], everywhere: false,
        betterServedWith: [],
        ratings:{relevancy: 2, reliability: 4, sustainability: 2, efficiency: 4}
    }
}