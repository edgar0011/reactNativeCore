import { memo } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { factory as routingFactory } from '../../routing/routingFactory'

import { ChatContacts } from './ChatContacts'
import { Chat } from './alt/Chat2'

const Stack = createStackNavigator()

export const config = {
  initialRouteName: 'Location',
  screens: [
    {
      name: 'Contacts',
      component: ChatContacts,
      initialParams: { chatRoute: 'Chat2' },
    },
    {
      name: 'Chat2',
      component: Chat,
    },
  ],
}

export const ChatStack2 = memo(() => routingFactory(Stack.Navigator, Stack.Screen, config))
