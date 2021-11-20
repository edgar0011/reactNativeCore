import React, { PureComponent } from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Dimensions,
  Platform,
} from 'react-native'
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen'
// import MapView from 'react-native-maps'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line import/no-cycle
import { navigate } from '../../routing/MainStackNavigator'
import { GenericSafeAreaView } from '../../components/common/GenericSafeAreaView'

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
  container: {
    position: 'relative',
    width: '100%',
    minHeight: 300,
    height: Dimensions.get('window').height * (Platform.OS === 'ios' ? 0.6 : 0.55),
  },
  map: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

export class Map extends PureComponent<any, any> {
  gotoLocation = () => {
    navigate('Location')
  }

  render () {
    const { params, navigation, route, ...props } = this.props
    console.log('Map')
    console.log('params, navigation, route, ...props ')
    console.log(params, navigation, route, props)
    const coords = route?.params?.location?.coords
    console.log('coords')
    console.log(coords)
    const newRegion = {
      longitude: coords.longitude,
      latitude: coords.latitude,
      longitudeDelta: 0.02,
      latitudeDelta: 0.02,
    }
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <GenericSafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior='automatic'
            style={styles.scrollView}
          >
            <Button
              title='Go to Location'
              onPress={this.gotoLocation}
            />
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Map</Text>
                <Text style={styles.sectionDescription}>
                  MAP
                </Text>
              </View>
            </View>
            <View style={styles.container}>
              <Text> MAPVIEW PLACEHOLDER</Text>
              {/* <MapView
                style={styles.map}
                region={newRegion}
              /> */}
            </View>
            <Text>{JSON.stringify(coords)}</Text>
          </ScrollView>
        </GenericSafeAreaView>
      </>
    )
  }
}
