import React from 'react'

import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {linkTo} from '@storybook/addon-links'

import {Button, Welcome} from '@storybook/react/demo'
import Time from '../src/components/time'
import Departure from '../src/components/departure'
import LocationPrompt from '../src/components/locationPrompt'
import {Image, LoadPicture, Text, View} from '../src/wrapper'
import core from '../src/core'

storiesOf('Welcome', module).add('Sncf-le-panneau', () =>
    <View>
        <Text style={{fontSize:30, fontWeight:'bold'}}>Sncf le panneau</Text>
        <Text>Ce storybook permet de voir et de tester les composants de l'application sncf-le-panneau</Text>
        <Image style={{width:300, height:250}} source={LoadPicture('logo')} />
    </View>)

storiesOf('Departure', module)
    .add('Rouen Rive Droite', () =>
        <Departure height={300} num={1} detailed={true} odd={false} detailsRow={1 <= 1 ? 1 + 1 : undefined} parent={{}} rowHeight={280} rowWidth={320} mustBePadded={false}
                   departure={{
                       direction:'Rouen-Rive droite',
                       number:'13107',
                       platform:'2',
                       time:'12:19',
                       mode:'Intercités',
                       stops:['Mantes-la-jolie', 'Vernon', 'Gaillon-Aubevoie', 'Val de Reuil', 'Oissel', 'Rouen-Rive droite']}}/>)
    .add('Montereau', () =>
        <Departure height={300} num={0} detailed={true} odd={true} detailsRow={0 <= 1 ? 0 + 1 : undefined} parent={{}} rowHeight={280} rowWidth={320} mustBePadded={true}
                   departure={{
                       direction:'Montereau',
                       platform:'K',
                       time:'10:19',
                       mode:'Transilien',
                       name:'R',
                       number:'KUMO',
                       color:'e4b4d1',
                       stops:['Melun', 'Bois-le-Roi', 'Fontainebleau-Avon', 'Moret-Veneux les sablons', 'Saint-Mammès', 'Montereau']}}/>)
    .add('Nevers (petit)', () =>
        <Departure height={300} num={3} detailed={false} odd={true} detailsRow={3 <= 1 ? 3 + 1 : undefined} parent={{}} rowHeight={280} rowWidth={320} mustBePadded={false}
                   departure={{
                       direction:'Nevers',
                       number:'13107',
                       platform:'2',
                       time:'15:23',
                       mode:'Intercités',
                       color:'e4b4d1',
                       stops:[]}}/>)

storiesOf('Time', module).add('Time', () => <Time/>)

storiesOf('LocationPrompt', module).add('LocationPrompt', () =>
    <LocationPrompt displayLocationPrompt={true} suggestStations={station => core.suggestStations(station)}/>)