import {get} from 'axios'

const garesSncfDeparturesUrl = (tvs) => `https://www.gares-sncf.com/fr/train-times/${tvs.toUpperCase()}/departure`

const getGaresSncfDepartures = ({iataCodes:tvsList}) => Promise.all(tvsList.map(tvs => get(garesSncfDeparturesUrl(tvs))))
    .then(results =>
        results.reduce((acc, value) => acc.concat(value.data.trains || []), []))
    .then(trains => trains.map(train => {return {
            savedNumber: parseInt(train.num),
            dataToDisplay: {
                platform: train.voie,
                miscStatus: train.etat,
                delay: train.retard
            }
        }
    }))

export default {feed:[getGaresSncfDepartures],
    metadata:{features:['platforms'], everywhere: false, ratings:{relevancy: 3, reliability: 4, sustainability: 2}}}