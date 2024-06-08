jest.mock('@react-native-firebase/auth', () => () => ({
    signInWithCustomToken: jest.fn(),
  }))