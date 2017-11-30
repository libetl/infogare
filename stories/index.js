import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Button, Welcome } from '@storybook/react/demo'
import Time from '../src/components/time'
import Departure from '../src/components/departure'
import LocationPrompt from '../src/components/locationPrompt'
import {View, Text, LoadPicture, Image} from '../src/wrapper'
import core from '../src/core'

storiesOf('Welcome', module).add('Sncf-le-panneau', () =>
  <View>
    <Text style={{fontSize:30, fontWeight:'bold'}}>Sncf le panneau</Text>
    <Text>Ce storybook permet de voir et de tester les composants de l'application sncf-le-panneau</Text>
    <Image style={{width:300, height:250}} source={LoadPicture('logo')} />
  </View>)

storiesOf('Departure', module)
  .add('Rouen Rive Droite', () =>
      <Departure rows={10} num={1} key={`departure1`} detailed={1} odd={1 % 2 === 0} detailsRow={1 <= 1 ? 1 + 1 : undefined} parent={{}} rowHeight={280} rowWidth={320} mustBePadded={false}
                 departure={{
                         direction:'Rouen-Rive droite',
                         number:'13107',
                         platform:'2', 
                         time:'12:19',
                         mode:'Intercités',
                         stops:['Mantes-la-jolie', 'Vernon', 'Gaillon-Aubevoie', 'Val de Reuil', 'Oissel', 'Rouen-Rive droite']}}/>)
    .add('Montereau', () =>
        <Departure rows={10} num={0} key={`departure0`} detailed={1} odd={0 % 2 === 0} detailsRow={0 <= 1 ? 0 + 1 : undefined} parent={{}} rowHeight={280} rowWidth={320} mustBePadded={true}
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
                       <Departure rows={10} num={3} key={`departure0`} detailed={3} odd={3 % 2 === 0} detailsRow={3 <= 1 ? 3 + 1 : undefined} parent={{}} rowHeight={280} rowWidth={320} mustBePadded={false}
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