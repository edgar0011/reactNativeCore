import { Home } from '../modules/home/Home'
import { LocationStack } from '../modules/location/LocationStack'
// import { Location } from '../modules/location/Location'
// import { Map } from '../modules/location/Map'
import { ChatStack } from '../modules/chat/ChatStack'
import { ChatStack2 } from '../modules/chat/ChatStack2'

export const config = {
  initialRouteName: 'Home',
  screens: [
    {
      name: 'Home',
      component: Home,
    },
    {
      name: 'Chat',
      component: ChatStack,
    },
    {
      name: 'Chat2',
      component: ChatStack2,
    },
    {
      name: 'Location',
      component: LocationStack,
    },
  ],
}
