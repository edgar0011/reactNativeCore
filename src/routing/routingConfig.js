import { Home } from '../modules/home/Home'
import { Location } from '../modules/location/Location'

export const config = {
  initialRouteName: 'Home',
  screens: [
    {
      name: 'Home',
      component: Home,
    },
    {
      name: 'Location',
      component: Location,
    },
  ],
}
