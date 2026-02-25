import "./global.css";
import { setupMocks } from './src/mocks/browser';

if (process.env.NODE_ENV !== 'production') {
  setupMocks();
}

import "expo-router/entry";
