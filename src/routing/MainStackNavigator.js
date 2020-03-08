
import React, { PureComponent } from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { factory as routingFactory } from './routingFactory'
import { config as routingConfig } from './routingConfig'

// const Stack = createStackNavigator()
const Stack = createBottomTabNavigator()

export const navigationRef = React.createRef()

export const navigate = (name, params) => navigationRef.current?.navigate(name, params)

export class MainStackNavigator extends PureComponent {
  render () {
    // eslint-disable-next-line no-console
    console.log('navigationRef')
    // eslint-disable-next-line no-console
    console.log(navigationRef)
    return (
      <NavigationContainer ref={navigationRef}>
        {routingFactory(Stack.Navigator, Stack.Screen, routingConfig)}
      </NavigationContainer>
    )
  }
}
