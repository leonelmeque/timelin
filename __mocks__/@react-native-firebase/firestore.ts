const mockedFirestoreCollection = jest.fn()
jest.mock('@react-native-firebase/firestore', () => () => ({
  collection: mockedFirestoreCollection
}))
