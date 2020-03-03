
import { NativeModules } from 'react-native'

// Mock the RNCGeolocation native module to allow us to unit test the JavaScript code
NativeModules.RNCGeolocation = {
  addListener: jest.fn(),
  getCurrentPosition: jest.fn(),
  removeListeners: jest.fn(),
  requestAuthorization: jest.fn(),
  setConfiguration: jest.fn(),
  startObserving: jest.fn(),
  stopObserving: jest.fn(),
}

// // Reset the mocks before each test
// beforeEach(() => {
//   jest.resetAllMocks()
// })

jest.mock('react-native-reanimated', () => import('react-native-reanimated/mock'))
