import React, { Component } from 'react'
import {
  Text, View, ScrollView, Keyboard, StatusBar,
} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'

import { GenericSafeAreaView } from '../../../components/common/GenericSafeAreaView'

import { styles } from './styles'
import { MessageBubble } from './MessageBubble'
import { InputBar } from './InputBar'

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export class Chat extends Component {
  constructor (props) {
    super(props)

    // eslint-disable-next-line max-len
    const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac orci augue. Sed fringilla nec magna id hendrerit. Proin posuere, tortor ut dignissim consequat, ante nibh ultrices tellus, in facilisis nunc nibh rutrum nibh.'

    const numberOfMessages = 20

    const messages = 'x'.repeat(numberOfMessages).split('').map(() => {
      const messageLength = getRandomInt(10, 120)
      const direction = getRandomInt(1, 2) === 1 ? 'right' : 'left'
      this.scrollView = React.createRef()
      return {
        id: uuidv4(),
        direction,
        text: loremIpsum.substring(0, messageLength),
      }
    })

    this.state = {
      messages,
      inputBarText: '',
    }
  }

  // fun keyboard stuff- we use these to get the end of the ScrollView
  // to "follow" the top of the InputBar as the keyboard rises and falls
  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))
  }

  // scroll to bottom when first showing the view
  componentDidMount () {
    setTimeout(() => {
      this.scrollView.current.scrollToEnd()
    })
  }

  // this is a bit sloppy: this is to make sure it scrolls to the bottom when a message is added, but
  // the component could update for other reasons, for which we wouldn't want it to scroll to the bottom.
  componentDidUpdate () {
    setTimeout(() => {
      this.scrollView.current.scrollToEnd()
    })
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  // When the keyboard appears, this gets the ScrollView
  // to move the end back "up" so the last message is visible with the keyboard up
  // Without this, whatever message is the keyboard's height from the bottom will look like the last message.
  keyboardDidShow = () => {
    this.scrollView.current.scrollToEnd()
  }

  // When the keyboard dissapears, this gets the ScrollView to move the last message back down.
  keyboardDidHide = () => {
    this.scrollView.current.scrollToEnd()
  }

  sendMessage = () => {
    this.state.messages.push({ direction: 'right', text: this.state.inputBarText })

    this.setState((prevState) => (
      {
        messages: prevState.messages,
        inputBarText: '',
      }
    ))
  }

  onChangeInputBarText = (text) => {
    this.setState({
      inputBarText: text,
    })
  }

  // This event fires way too often.
  // We need to move the last message up if the input bar expands
  // due to the user's new message exceeding the height of the box.
  // We really only need to do anything when the height of the InputBar changes, but AutogrowInput can't tell us that.
  // The real solution here is probably a fork of AutogrowInput that can provide this information.
  onInputSizeChange = () => {
    setTimeout(() => {
      this.scrollView.current.scrollToEnd({ animated: false })
    })
  }

  static navigationOptions = {
    title: 'Chat',
  };

  renderMessages = (messages) => messages.map(({ id, direction, text }) => (
    <MessageBubble key={id} direction={direction} text={text} />
  ))

  render () {
    const { route } = this.props
    const { messages } = this.state

    return (
      <>
        <StatusBar barStyle='dark-content' />
        <GenericSafeAreaView>
          <Text style={styles.contact}>{route.params.contact.name}</Text>
          <View style={styles.outer}>
            {/* <Text>messages: {JSON.stringify({ messages })}</Text> */}
            <ScrollView ref={this.scrollView} style={styles.messages}>
              {this.renderMessages(messages)}
            </ScrollView>
            <InputBar
              onSendHandler={this.sendMessage}
              onSizeChange={this.onInputSizeChange}
              onChangeText={this.onChangeInputBarText}
              text={this.state.inputBarText}
            />
            <KeyboardSpacer />
          </View>
        </GenericSafeAreaView>
      </>
    )
  }
}

Chat.propTypes = {
  route: PropTypes.object,
}
