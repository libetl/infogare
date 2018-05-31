import fake from './fake'
import flightRadar from './flightRadar'
import garesSncf from './garesSncf'
import horairesInfoTrafic from './horairesInfoTrafic'
import herokuHomegrown from './herokuHomegrown'
import inMemory from './inMemory'
import lignesDazur from './lignesDazur'
import navitiaIo from './navitiaIo'
import stas from './stas'
import liveMap from './liveMap'
import nouveauSncf from './nouveauSncf'
import offline from './offline'
import raildar from './raildar'
import sncfApi from './sncfApi'
import terSncf from './terSncf'
import transilien from './transilien'
import vianavigo from './vianavigo'

import {config} from '../../wrapper'

export default config.PRIVILEGED ?
    { fake, flightRadar, garesSncf, herokuHomegrown, horairesInfoTrafic, inMemory, lignesDazur, liveMap, navitiaIo, nouveauSncf, offline, raildar, sncfApi, stas, terSncf, transilien, vianavigo } :
    { flightRadar, herokuHomegrown, inMemory, lignesDazur, navitiaIo, offline, raildar, sncfApi, stas, vianavigo }
