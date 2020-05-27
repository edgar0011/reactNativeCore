import { Button } from 'react-native-elements'
// import Icon from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/Feather'
// import ImagePicker from 'react-native-image-picker'
import ImagePicker from 'react-native-image-crop-picker'
import React, { memo, PureComponent } from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
} from 'react-native'

import { GenericSafeAreaView } from '../../components/common/GenericSafeAreaView'

Icon.loadFont()

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#EFEFEF',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#FFF',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#333',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: '#333',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
})

const butonIcon = (
  <Icon
    name='upload'
    size={15}
    color='white'
    margin='4'
  />
)

const keyExtractor = ({ filename, path }) => `${filename}-${path}`

const ImageItem = memo<{ path: string; filename: string }>(({ path, filename }) => (
  <View>
    <Text>{filename}</Text>
    <Image style={{ width: 100, height: 100 }} source={{ uri: path }} />
  </View>
))

ImageItem.displayName = 'ImageItem'

type UserState = {
  images: string[]
}
export class User extends PureComponent<any, UserState> {
  state: UserState = {
    images: [],
  }

  renderItem = ({ item }) => (
    <TouchableHighlight>
      <ImageItem {...item} />
    </TouchableHighlight>
  )

  onImagePicked = (images) => {
    console.log(images)
    this.setState((prevState) => ({ images: [...prevState.images || [], ...images] }))
  }

  handleLoadImage = () => {
    // const options = {
    //   noData: true,
    // }
    // ImagePicker.launchCamera(options, (response) => {
    // ImagePicker.launchImageLibrary(options, (response) => {
    // ImagePicker.showImagePicker(options, (response) => {
    //   if (response && !response.didCancel && !response.error) {
    //     this.onImagePicked(response)
    //   }
    // })
    ImagePicker.openPicker({
      multiple: true,
    }).then(this.onImagePicked)
  }

  render () {
    const { images } = this.state
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <GenericSafeAreaView>
          <View
            style={styles.scrollView}
          >
            <Text style={styles.sectionTitle}>User</Text>
            <Button
              onPress={this.handleLoadImage}
              icon={butonIcon}
              title='Pick Images'
            />
            <View style={styles.body} />
          </View>
          {/* <Text>{JSON.stringify(images)}</Text> */}
          <View style={styles.container}>
            <FlatList
              data={images}
              renderItem={this.renderItem}
              keyExtractor={keyExtractor}
            />
          </View>
        </GenericSafeAreaView>
      </>
    )
  }
}
