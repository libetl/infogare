import {baseDepartures} from '../src/core/sources/horairesInfoTrafic'
import coloredStringifiedJson from './coloredStringifiedJson'


baseDepartures('Paris-Gare-De-Lyon')
    .then(response => console.log(coloredStringifiedJson(response)))
