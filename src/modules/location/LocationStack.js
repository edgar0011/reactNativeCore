import { memo } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { factory as routingFactory } from '../../routing/routingFactory'

import { Location } from './Location'
import { Map } from './Map'

const Stack = createStackNavigator()

export const config = {
  initialRouteName: 'Location',
  screens: [
    {
      name: 'Location',
      component: Location,
    },
    {
      name: 'Map',
      component: Map,
    },
  ],
}

export const LocationStack = memo(() => routingFactory(Stack.Navigator, Stack.Screen, config))
