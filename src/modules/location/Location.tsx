import React, { PureComponent } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FlatList,
} from 'react-native'
import {
  Header,
  LearnMoreLinks,
  Colors,
} from 'react-native/Libraries/NewAppScreen'

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
})

type LocationState = {
  location?: any
  items?: Array<any>
}

export class Location extends PureComponent<any, LocationState> {
  state: LocationState = {}

  async componentDidMount () {
    const location = await getCurrentPosition()
    const items = await load()
    this.setState(() => ({ location, items }))
  }

  render () {
    const { location, items } = this.state
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior='automatic'
            style={styles.scrollView}
          >
            <Header />

            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Location</Text>
                <Text style={styles.sectionDescription}>
                  {JSON.stringify(location)}
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Items</Text>
                <Text style={styles.sectionDescription}>
                  {JSON.stringify(items)}
                </Text>
              </View>

              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Learn More</Text>
                <Text style={styles.sectionDescription}>
                  Read the docs to discover what to do next:
                </Text>
              </View>
              <LearnMoreLinks />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }
}
