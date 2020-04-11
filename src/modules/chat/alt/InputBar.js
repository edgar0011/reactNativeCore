// The bubbles that appear on the left or the right for the messages.
import React, { PureComponent } from 'react'
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import AutogrowInput from 'react-native-autogrow-input'

import { styles } from './styles'

const stylesInner = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between', flexDirection: 'row',
  },
  sendText: { color: 'white' },
})

// The bar at the bottom with a textbox and a send button.
export class InputBar extends PureComponent {
  // AutogrowInput doesn't change its size when the text is changed from the outside.
  // Thus, when text is reset to zero, we'll call it's reset function which will take it back to the original size.
  // Another possible solution here would be if InputBar kept the text as state and only
  // reported it when the Send button
  // was pressed. Then, resetInputText() could be called when the Send button is pressed.
  // However, this limits the ability
  // of the InputBar's text to be set from the outside.
  autogrowInput = React.createRef()

  componentWillReceiveProps (nextProps) {
    if (nextProps.text === '') {
      this.autogrowInput.current.resetInputText()
    }
  }

  render () {
    const { text, onChangeText, onSizeChange, onSendHandler } = this.props
    return (
      <View style={styles.inputBar}>
        <AutogrowInput
          style={styles.textBox}
          ref={this.autogrowInput}
          multiline
          defaultHeight={30}
          onChangeText={onChangeText}
          onContentSizeChange={onSizeChange}
          value={text}
        />
        <TouchableHighlight style={styles.sendButton} onPress={onSendHandler}>
          <Text style={stylesInner.sendText}>Send</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
InputBar.propTypes = {
  text: PropTypes.string,
  onSendHandler: PropTypes.func,
  onSizeChange: PropTypes.func,
  onChangeText: PropTypes.func,
}
InputBar.displayName = 'InputBar'
