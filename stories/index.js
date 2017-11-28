import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Button, Welcome } from '@storybook/react/demo'
import Departure from '../src/components/departure'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>)

storiesOf('Departure', module)
  .add('Rouen Rive Droite', () =>
      <Departure rows={10} num={1} key={`departure1`} detailed={1} odd={1 % 2 === 0} detailsRow={1 <= 1 ? 1 + 1 : undefined} parent={{}} rowHeight={280} rowWidth={320} mustBePadded={false}
                 departure={{
                         direction:'Rouen-Rive droite',
                         platform:'2', time:'18:15',
                         mode:'Intercités',
                         stops:['Mantes-la-jolie', 'Vernon', 'Gaillon-Aubevoie', 'Val de Reuil', 'Oissel', 'Rouen-Rive droite']}}/>)
    .add('Montereau', () =>
        <Departure rows={10} num={0} key={`departure0`} detailed={1} odd={0 % 2 === 0} detailsRow={0 <= 1 ? 0 + 1 : undefined} parent={{}} rowHeight={280} rowWidth={320} mustBePadded={true}
                   departure={{
                       direction:'Montereau',
                       platform:'K', time:'10:19',
                       mode:'Transilien',
                       name:'R',
                       number:'KUMO',
                       color:'e4b4d1',
                       stops:['Melun', 'Bois-le-Roi', 'Fontainebleau-Avon', 'Moret-Veneux les sablons', 'Saint-Mammès', 'Montereau']}}/>)