
import React, { memo } from 'react'
import { enableScreens } from 'react-native-screens'

import { AppSafeAreaView } from './components/common/GenericSafeAreaView'
import { MainStackNavigator } from './routing/MainStackNavigator'

import 'react-native-get-random-values'

enableScreens()

// TODO add redux
const App = memo(() => (
  <AppSafeAreaView>
    <MainStackNavigator />
  </AppSafeAreaView>
))

export default App
