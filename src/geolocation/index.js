import Geolocation from '@react-native-community/geolocation'

export const getCurrentPosition = () => new Promise((resolve, reject) => {
  try {
    Geolocation.getCurrentPosition((info) => {
      resolve(info)
    })
  } catch (error) {
    reject(error)
  }
})

getCurrentPosition().then(console.log)
