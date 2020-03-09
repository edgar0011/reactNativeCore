import { memo } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { factory as routingFactory } from '../../routing/routingFactory'

import { ChatContacts } from './ChatContacts'
import { Chat } from './Chat'

const Stack = createStackNavigator()

export const config = {
  initialRouteName: 'Location',
  screens: [
    {
      name: 'Contacts',
      component: ChatContacts,
    },
    {
      name: 'Chat',
      component: Chat,
    },
  ],
}

export const ChatStack = memo(() => routingFactory(Stack.Navigator, Stack.Screen, config))
