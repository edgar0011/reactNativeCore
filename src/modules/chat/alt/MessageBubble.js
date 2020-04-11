// The bubbles that appear on the left or the right for the messages.
import React, { memo } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import { styles } from './styles'

const stylesInner = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between', flexDirection: 'row',
  },
  spacer: { width: 70 },
})

const buildRenderers = (direction) => ({
  leftSpacer: direction === 'left' ? null : <View style={stylesInner.spacer} />,
  rightSpacer: direction === 'left' ? <View style={stylesInner.spacer} /> : null,
  bubbleStyles: direction === 'left'
    ? [styles.messageBubble, styles.messageBubbleLeft]
    : [styles.messageBubble, styles.messageBubbleRight],
  bubbleTextStyle: direction === 'left' ? styles.messageBubbleTextLeft : styles.messageBubbleTextRight,

})

export const MessageBubble = memo(({ text, direction }) => {
  const { leftSpacer, rightSpacer, bubbleStyles, bubbleTextStyle } = buildRenderers(direction)
  return (
    <View style={stylesInner.wrapper}>
      {leftSpacer}
      <View style={bubbleStyles}>
        <Text style={bubbleTextStyle}>
          {text}
        </Text>
      </View>
      {rightSpacer}
    </View>
  )
})
MessageBubble.propTypes = {
  text: PropTypes.string,
  direction: PropTypes.string,
}
MessageBubble.displayName = 'MessageBubble'
