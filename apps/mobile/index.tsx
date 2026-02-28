import "./global.css";
import { setupMocks } from './src/mocks/browser';

if (process.env.NODE_ENV !== 'production') {
  setupMocks();
}

if (process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true') {
  require('./.rnstorybook');
} else {
  require('expo-router/entry');
}
