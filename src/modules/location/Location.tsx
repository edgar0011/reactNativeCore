import React, { memo, PureComponent } from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FlatList,
} from 'react-native'
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen'

import { GenericSafeAreaView } from '../../components/common/GenericSafeAreaView'
import { getCurrentPosition } from '../../geolocation'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { load } from '../../dataloader'

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTopContainer: {
    backgroundColor: Colors.lighter,
    flexDirection: 'column',
    marginTop: 120,
    paddingHorizontal: 10,
  },
  sectionContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 5,
    fontSize: 11,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  item: {
    padding: 8,
    marginVertical: 2,
    marginHorizontal: 4,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
  },
  titleSMall: {
    fontSize: 12,
  },
  itemText: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    alignSelf: 'stretch',
    margin: 6,
  },
  text: {
    fontSize: 10,
    margin: 4,
  },
})

type LocationState = {
  location?: any
  items?: Array<any>
}

type ItemProps = {
  name: string
  username: string
  email: string
  address: {
    street: string
    city: string
    zipcode: string
  }
  right: boolean
}

const Item = memo<ItemProps>(({ name, username, email, address, right }) => (
  <View style={[styles.item, { alignItems: right ? 'flex-end' : 'flex-start' }]}>
    <Text style={styles.title}>{name} ({username})</Text>
    <View style={[styles.itemText, { alignItems: right ? 'flex-end' : 'flex-start' }]}>
      <Text style={styles.text}>{email}</Text>
      <Text style={styles.text}>{address?.street}</Text>
      <Text style={styles.text}>{address?.city}, {address?.zipcode}</Text>
    </View>
  </View>
))

Item.displayName = 'Item'

const keyExtractor = ({ id }) => `${id}`

const renderItem = ({ item, index }) => (
  <Item {...item} right={index % 2 === 0} />
)

export class Location extends PureComponent<any, LocationState> {
  state: LocationState = {}

  async componentDidMount () {
    const location = await getCurrentPosition()
    const items = await load()
    this.setState(() => ({ location, items }))
  }

  gotoMap = () => {
    this.props.navigation.navigate('Map', { location: this.state.location })
  }

  render () {
    const { location, items } = this.state
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <GenericSafeAreaView>
          <View>
            <View style={styles.body}>
              <View
                style={styles.sectionTopContainer}
              >
                <Button
                  title='Go to Map'
                  onPress={this.gotoMap}
                />
                <Text style={styles.sectionDescription}>
                  {JSON.stringify(location)}
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Items</Text>
                <FlatList
                  data={items}
                  renderItem={renderItem}
                  keyExtractor={keyExtractor}
                />
              </View>
            </View>
          </View>
        </GenericSafeAreaView>
      </>
    )
  }
}
