/* eslint-disable class-methods-use-this */
import React, { memo, PureComponent } from 'react'
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableHighlight,
} from 'react-native'
import { Badge } from 'react-native-elements'
import PropTypes from 'prop-types'

import { GenericSafeAreaView } from '../../components/common/GenericSafeAreaView'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  contact: {
    backgroundColor: '#a2c72b',
    padding: 8,
    marginVertical: 2,
    marginHorizontal: 4,
    borderRadius: 12,
  },
  badgeStyle: {
    backgroundColor: '#e01a49',
  },
  containerStyle: { position: 'absolute', top: -0, right: -0 },
  title: {
    fontSize: 16,
    color: '#000000',
  },
  titleOffline: {
    color: '#999999',
  },
})

const ROLES = {
  OWNER: 'owner',
  COE: 'CEO',
  SUPPORT: 'SUPPORT',
  ADVISOR: 'advisor',
}

const contacts = [
  {
    name: 'Majitel',
    notifications: 11,
    role: ROLES.OWNER,
  },
  {
    name: 'Poradce',
    notifications: 6,
    role: ROLES.OWNER,
  },
  {
    name: 'Podpora',
    notifications: 6,
    role: ROLES.SUPPORT,
    textColor: '#00a78f',
  },
]

const Item = memo(({ name, notifications }) => (
  <View style={styles.contact}>
    <Text style={styles.title}>{name}</Text>
    <Badge
      status='warning'
      value={notifications}
      containerStyle={styles.containerStyle}
      badgeStyle={styles.badgeStyle}
    />
  </View>
))

Item.displayName = 'Item'
Item.propTypes = {
  name: PropTypes.string,
  notifications: PropTypes.oneOfType([PropTypes.numberg, PropTypes.string]),
}

const keyExtractor = ({ id, name }) => `${id}-${name}`

export class ChatContacts extends PureComponent<any, any> {
  onPressItem = (item) => () => {
    console.log('Item Pressed', item)
    this.gotoChat(item)
  }

  renderItem = ({ item }) => (
    <TouchableHighlight
      onPress={this.onPressItem(item)}
    >
      <Item {...item} />
    </TouchableHighlight>
  )

  gotoChat = (contact) => {
    this.props.navigation.navigate(this.props.route.params.chatRoute || 'Chat', { contact })
  }

  render () {
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <GenericSafeAreaView>
          <View style={styles.container}>
            <FlatList
              data={contacts}
              renderItem={this.renderItem}
              keyExtractor={keyExtractor}
            />
          </View>
        </GenericSafeAreaView>
      </>
    )
  }
}
