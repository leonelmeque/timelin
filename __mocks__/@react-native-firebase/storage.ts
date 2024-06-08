const mockedFirestoreStorage = jest.fn()
jest.mock('@react-native-firebase/storage', () => () => ({
  collection: mockedFirestoreStorage
}))
