import { ExpoConfig, ConfigContext } from '@expo/config';
import * as dotenv from 'dotenv';
import * as path from 'path';


dotenv.config({
  path: process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, ".env.production")
    : path.resolve(__dirname, ".env"),
});


export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'todo-mobile',
  slug: 'todo-mobile',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash-screen.png',
    resizeMode: 'cover',
    backgroundColor: '#ffffff',
  },
  updates: {},
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.timelin.mobile',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'com.timelin.mobile',
  },
  scheme: 'timelin',
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
  },
  plugins: [
    'expo-router',
    [
      'expo-image-picker',
      {
        photosPermission:
          'The app accesses your photos to let you share them with your friends.',
      },
    ],
    '@react-native-community/datetimepicker',
    'expo-build-properties',
  ],
  extra: {
    appName: 'timelin-mobile',
    eas: {
      projectId: 'd0d6955c-36c9-4246-8d5f-fc8446f4eaef',
    },
  },
});
