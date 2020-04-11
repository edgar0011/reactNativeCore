import Geolocation from '@react-native-community/geolocation'

Geolocation.requestAuthorization()

export const getCurrentPosition = () => new Promise((resolve, reject) => {
  try {
    Geolocation.getCurrentPosition((info) => {
      resolve(info)
    })
  } catch (error) {
    reject(error)
  }
})

// getCurrentPosition().then(console.log)
