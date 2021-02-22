/* eslint-disable class-methods-use-this */
import firebase from 'firebase'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

const uuid = uuidv4

const config = {
  apiKey: 'AIzaSyDx5BhYhVk5zo3fefU5uqb78CZelnbfnYs',
  authDomain: 'chat-aeb0e.firebaseapp.com',
  databaseURL: 'https://chat-aeb0e.firebaseio.com',
  projectId: 'chat-aeb0e',
  storageBucket: 'chat-aeb0e.appspot.com',
  messagingSenderId: '163008600502',
  // appId: "1:163008600502:web:8e5855a347f2eac9f30917"
}

class FirebaseService {
  constructor () {
    if (!firebase.apps.length) {
      firebase.initializeApp(config)
    } else {
      console.log('firebase apps already running...')
    }
  }

  login = async (user, successCallback, failedCallback) => {
    console.log('logging in')
    await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(successCallback, failedCallback)
  }

  observeAuth = () => firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = (user) => {
    if (!user) {
      try {
        this.login(user)
      } catch ({ message }) {
        console.log(`Failed:${message}`)
      }
    } else {
      console.log('Reusing auth...')
    }
  };

  createAccount = async (user) => {
    firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        console.log(`created user successfully. User email:${user.email} name:${user.name}`)
        const userf = firebase.auth().currentUser
        userf.updateProfile({ displayName: user.name })
          .then(() => {
            console.log(`Updated displayName successfully. name:${user.name}`)
            alert(`User ${user.name} was created successfully. Please login.`)
          }, () => {
            console.warn('Error update displayName.')
          })
      }, (error) => {
        console.error(`got error:${typeof (error)} string:${error.message}`)
        alert(`Create account failed. Error: ${error.message}`)
      })
  }

  // eslint-disable-next-line consistent-return
  uploadImage = async (uri) => {
    console.log(`got image to upload. uri:${uri}`)
    try {
      const response = await fetch(uri)
      const blob = await response.blob()
      const ref = firebase
        .storage()
        .ref('avatar')
        .child(uuid())
      const task = ref.put(blob)

      return new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          () => {
            /* noop but you can track the progress here */
          },
          reject /* this is where you would put an error callback! */,
          () => resolve(task.snapshot.downloadURL),
        )
      })
    } catch (err) {
      console.log(`uploadImage try/catch error: ${err.message}`) // Cannot load an empty url
    }
  }

  updateAvatar = (url) => {
    // await this.setState({ avatar: url });
    const userf = firebase.auth().currentUser
    if (userf != null) {
      userf.updateProfile({ avatar: url })
        .then(() => {
          console.log(`Updated avatar successfully. url:${url}`)
          alert('Avatar image is saved successfully.')
        }, (error) => {
          console.warn('Error update avatar.')
          alert(`Error update avatar. Error:${error.message}`)
        })
    } else {
      console.log('can\'t update avatar, user is not login.')
      alert('Unable to update avatar. You must login first.')
    }
  }

  onLogout = () => {
    firebase.auth().signOut().then(() => {
      console.log('Sign-out successful.')
    }).catch(() => {
      console.log('An error happened when signing out')
    })
  }

  currentUser = { uid: uuid() }

  get uid () {
    return (firebase.auth().currentUser || this.currentUser).uid
  }

  get ref () {
    return firebase.database().ref('messages')
  }

  parse = (snapshot) => {
    const { timestamp: numberStamp, text, user } = snapshot.val()
    const { key: id } = snapshot
    const { key: _id } = snapshot // needed for giftedchat
    const timestamp = new Date(numberStamp)

    const message = {
      id,
      _id,
      timestamp,
      text,
      user,
    }
    return message
  };

  refOn = (callback) => {
    this.ref
      .limitToLast(20)
      .on('child_added', (snapshot) => callback(this.parse(snapshot)))
  }

  get timestamp () {
    return firebase.database.ServerValue.TIMESTAMP
  }

  // send the message to the Backend
  send = (messages) => {
    // eslint-disable-next-line no-plusplus, space-unary-ops
    for (let i = 0; i < messages.length; i ++) {
      const { text, user } = messages[i]
      console.log(text, user)
      const message = {
        text,
        user,
        createdAt: this.timestamp,
      }
      this.ref.push(message)
    }
  };

  refOff () {
    this.ref.off()
  }
}

export const firebaseService = new FirebaseService()
