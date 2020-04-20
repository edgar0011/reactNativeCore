import { Home } from '../modules/home/Home'
import { LocationStack } from '../modules/location/LocationStack'
// import { Location } from '../modules/location/Location'
// import { Map } from '../modules/location/Map'
import { ChatStack } from '../modules/chat/ChatStack'

export const config = {
  initialRouteName: 'Home',
  tabBarOptions: {
    labelStyle: {
      fontSize: 16,
    },
    tabStyle: {
      justifyContent: 'center',
    },
  },
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
      name: 'Location',
      component: LocationStack,
    },
  ],
}
