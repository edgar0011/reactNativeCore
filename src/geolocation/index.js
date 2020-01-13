import Geolocation from '@react-native-community/geolocation';
import DataLoader from '../dataloader'

Geolocation.getCurrentPosition((info) => {
  debugger
  console.log(info)
});
