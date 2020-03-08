import { Home } from '../modules/home/Home'
import { LocationStack } from '../modules/location/LocationStack'
// import { Location } from '../modules/location/Location'
// import { Map } from '../modules/location/Map'
import { Chat } from '../modules/chat/Chat'

export const config = {
  initialRouteName: 'Home',
  screens: [
    {
      name: 'Home',
      component: Home,
    },
    {
      name: 'Chat',
      component: Chat,
    },
    {
      name: 'LocationStack',
      component: LocationStack,
    },
  ],
}
