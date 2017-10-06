import {read} from '../src/core/sources/horairesInfoTrafic'
import coloredStringifiedJson from './coloredStringifiedJson'


read('Paris-Gare-De-Lyon')
    .then(response => console.log(coloredStringifiedJson(response)))
