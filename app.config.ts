import { ExpoConfig, ConfigContext } from '@expo/config';
import * as dotenv from 'dotenv';


dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : "./.env",
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
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
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
  ],
  extra: {
    appName: 'timelin-mobile',
    eas: {
      projectId: 'd0d6955c-36c9-4246-8d5f-fc8446f4eaef',
    },
  },
});
