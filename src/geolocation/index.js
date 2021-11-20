import Geolocation from 'react-native-geolocation-service'
import { Platform, PermissionsAndroid } from 'react-native'

export const getCurrentPosition = () => new Promise((resolve, reject) => {
  try {
    Geolocation.getCurrentPosition((info) => {
      console.log(info)
      resolve(info)
    })
  } catch (error) {
    reject(error)
  }
})

// getCurrentPosition().then(console.log)

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'ReactNativeCore App Location Permission',
          message:
            'ReactNativeCore App needs access to your fine location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera')
      } else {
        console.log('Camera permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  } else if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization()
  }
}

requestCameraPermission()
