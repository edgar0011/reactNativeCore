import { Home } from '../modules/home/Home'
import { LocationStack } from '../modules/location/LocationStack'
// import { Location } from '../modules/location/Location'
// import { Map } from '../modules/location/Map'

export const config = {
  initialRouteName: 'Home',
  screens: [
    {
      name: 'Home',
      component: Home,
    },
    // {
    //   name: 'Location',
    //   component: Location,
    // },
    // {
    //   name: 'Map',
    //   component: Map,
    // },
    {
      name: 'LocationStack',
      component: LocationStack,
    },
  ],
}
