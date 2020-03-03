
import React, { memo } from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { factory as routingFactory } from './routingFactory'
import { config as routingConfig } from './routingConfig'

// const Stack = createStackNavigator()
const Stack = createBottomTabNavigator()

export const MainStackNavigator = memo(() => (
  <NavigationContainer>
    {routingFactory(Stack.Navigator, Stack.Screen, routingConfig)}
  </NavigationContainer>
))
