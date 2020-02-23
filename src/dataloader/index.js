import axios from 'axios'
import { Alert } from 'react-native'

export const getData = (url, params) => axios.get(url, { params })

export const load = () => getData(`https://jsonplaceholder.typicode.com/users`)
  .then((res) => {
    const persons = res.data
    console.log(persons)
    Alert.alert(
      'Alert Title',
      JSON.stringify(persons),
      [
        { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    )
    return persons
  })
