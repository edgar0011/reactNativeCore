
import React, { memo } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  app: {
    flex: 1,
  },
})

export const GenericSafeAreaView = memo(({ children, ...props }) => (
  <SafeAreaView style={styles.container} {...props}>
    {children}
  </SafeAreaView>
))

export const AppSafeAreaView = memo(({ children, ...props }) => (
  <SafeAreaView style={styles.app} {...props}>
    {children}
  </SafeAreaView>
))
