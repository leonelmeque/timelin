import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import Constants from 'expo-constants';

export const config: FirebaseOptions = {
  projectId: Constants.expoConfig?.extra?.projectId,
  apiKey: Constants.expoConfig?.extra?.apiKey,
  authDomain: Constants.expoConfig?.extra?.authDomain,
  databaseURL: Constants.expoConfig?.extra?.databaseURL,
  storageBucket: Constants.expoConfig?.extra?.storageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.messagingSenderId,
  appId: Constants.expoConfig?.extra?.appId,
  measurementId: Constants.expoConfig?.extra?.measurementId,
};

let app: any;
let auth: any;

try {
  app = initializeApp(config);
  auth = getAuth(app);
} catch (error) {
  console.error(error);
}

export { auth };
export default app;
