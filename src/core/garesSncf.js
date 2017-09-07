import {get} from 'axios'
import moment from 'moment'

const garesSncfDeparturesUrl = (tvs) => `https://www.gares-sncf.com/fr/train-times/${tvs.toUpperCase()}/departure`

export default {
    getGaresSncfDepartures : (tvs) => get(garesSncfDeparturesUrl(tvs))
    .then((result) => {
        if (!Array.isArray(result.data.trains)) {
            return Promise.resolve({})
        }
        return Promise.resolve(result.data.trains)
    }),
    combineTchoutchouAndGaresSncf: (tchoutchouData, garesSncf) => {
        const now = moment().format('HH:mm')
        const tchoutchouAndGares = tchoutchouData.map(oneTchoutchou => {return {...oneTchoutchou, ...garesSncf.find(gareSncf => parseInt(gareSncf.num) === oneTchoutchou.dataToDisplay.number)}})
            .map(mixed => {
                const heure = mixed.heure || mixed.dataToDisplay.time
                return {
                    ...mixed,
                    stop_date_time: {
                        ...mixed.stop_date_time,
                        base_departure_date_time: heure.localeCompare(now) < 0 ? `${parseInt(heure.split(':')[0]) + 24}:${heure.split(':')[1]}` : heure,
                    },
                    dataToDisplay: {
                        mode: mixed.type || mixed.dataToDisplay.mode,
                        direction: mixed.dataToDisplay.direction,
                        name: mixed.type && mixed.type.includes(' ') ? departure.type.split(' ')[1] : '',
                        color: '000000',
                        number: mixed.num,
                        time: mixed.heure,
                        platform: mixed.voie,
                        stops: mixed.dataToDisplay.stops || []
                    }
                }
            })
        const garesNotTchoutchou =
            garesSncf.filter(gareSncf => !tchoutchouData.some(oneTchoutchou => parseInt(gareSncf.num) === oneTchoutchou.dataToDisplay.number))
                .map(departure => {
                    return {
                        ...departure,
                        stop_date_time: {
                            ...departure.stop_date_time,
                            base_departure_date_time: departure.heure.localeCompare(now) < 0 ? `${parseInt(departure.heure.split(':')[0]) + 24}:${departure.heure.split(':')[1]}` : departure.heure,
                        },
                        dataToDisplay: {
                            mode: departure.type ? departure.type.split(' ')[0] : '',
                            direction: departure.origdest,
                            name: departure.type && departure.type.includes(' ') ? departure.type.split(' ')[1] : '',
                            color: '000000',
                            number: departure.num,
                            time: departure.heure,
                            platform: departure.voie,
                            stops: []
                        }
                    }
                })

        return [...tchoutchouAndGares, ...garesNotTchoutchou]
    }
}