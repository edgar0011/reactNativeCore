/* eslint-disable class-methods-use-this */
import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  Text,
} from 'react-native'
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

import { GenericSafeAreaView } from '../../components/common/GenericSafeAreaView'
import { firebaseService } from '../../dataloader/firebase'

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
    flex: 1,
  },
  body: {
    backgroundColor: Colors.white,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 16,
  },
  text: {
    fontSize: 12,
  },
  contact: {
    fontSize: 16,
    padding: 8,
    backgroundColor: '#a2c72b',
  },
  chat: {
    flex: 1,
    width: '100%',
    height: Dimensions.get('window').height * 0.75,
  },
  chatBubbleLeft: {
    backgroundColor: 'white',
  },
  chatBubbleRight: {
    backgroundColor: '#2eaec5',
    borderRadius: 4,
  },
})

const chatBubbleStyle = {
  left: styles.chatBubbleLeft,
  right: styles.chatBubbleRight,
}

export class Chat extends PureComponent<any, any> {
  state = {
    messages: [],
  }

  componentDidMount () {
    firebaseService.refOn((message) => this.setState((prevState) => ({
      messages: GiftedChat.append(prevState.messages, message),
    })))
  }

  componentWillUnmount () {
    firebaseService.refOff()
  }

  onSend = (messages = []) => {
    // this.setState((previousState) => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }))
    firebaseService.send(messages)
  }

  get user () {
    return {
      // name: this.props.navigation.state.params.name,
      // email: this.props.navigation.state.params.email,
      // avatar: this.props.navigation.state.params.avatar,
      name: 'Edgar',
      id: firebaseService.uid,
      _id: firebaseService.uid, // need for gifted-chat
    }
  }

  renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={chatBubbleStyle}
    />
  )

  render () {
    const { route } = this.props
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <GenericSafeAreaView>
          <View
            contentInsetAdjustmentBehavior='automatic'
            style={styles.scrollView}
          >
            <Text style={styles.contact}>{route.params.contact.name}</Text>
            <View style={styles.chat}>
              <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={this.user}
                renderBubble={this.renderBubble}
              />
              {
                Platform.OS === 'android' && <KeyboardAvoidingView behavior='padding' />
              }
            </View>
          </View>
        </GenericSafeAreaView>
      </>
    )
  }
}
