import {get} from 'axios'
import flatten from 'arr-flatten'

const garesSncfDeparturesUrl = (tvs) => `https://www.gares-sncf.com/fr/train-times/${tvs.toUpperCase()}/departure`

const getGareSncfDepartures = (tvs) => get(garesSncfDeparturesUrl(tvs))
    .then(result => {
        if (!Array.isArray(result.data.trains)) {
            return Promise.resolve([])
        }
        return Promise.resolve(result.data.trains)
    }).then(trains => trains.map(train => {return {
            savedNumber: parseInt(train.num),
            dataToDisplay: {
                platform: train.voie,
                miscStatus: train.etat,
                delay: train.retard
            }
        }
    }))

const getGaresSncfDepartures = ({iataCodes:tvsList}) => Promise.all(tvsList.map(tvs => getGareSncfDepartures(tvs)))
    .then(departuresArrays => flatten(departuresArrays))

export default {feed:[getGaresSncfDepartures]}