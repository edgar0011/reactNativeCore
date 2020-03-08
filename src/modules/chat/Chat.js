import React, { memo, PureComponent } from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FlatList,
  TextInput,
  Button,
} from 'react-native'
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen'

import { GenericSafeAreaView } from '../../components/common/GenericSafeAreaView'

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
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#a9a36a',
    padding: 8,
    marginVertical: 2,
    marginHorizontal: 4,
  },
  title: {
    fontSize: 16,
  },
  text: {
    fontSize: 12,
  },
})

const items = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
]

const Item = memo(({ title, text }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
))

const keyExtractor = ({ id }) => id

const renderItem = ({ item }) => <Item title={item.title} />

export class Chat extends PureComponent<any, any> {
  gotoLocation = () => {
    this.props.navigation.navigate('LocationStack')
  }

  render () {
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <GenericSafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior='automatic'
            style={styles.scrollView}
          >
            <Text style={styles.header}>Chat</Text>
            <Button
              title='Go to Location'
              onPress={this.gotoLocation}
            />
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Chat</Text>
                <Text style={styles.sectionDescription}>
                  Chat
                </Text>
                <FlatList
                  data={items}
                  renderItem={renderItem}
                  keyExtractor={keyExtractor}
                />
              </View>
            </View>
            <TextInput />
          </ScrollView>
        </GenericSafeAreaView>
      </>
    )
  }
}
