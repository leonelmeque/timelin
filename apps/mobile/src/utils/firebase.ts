import firebase from 'firebase';
import Constants from 'expo-constants';
import { FirebaseOptions } from 'expo-firebase-core';

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



const app = firebase.initializeApp(config);
export const database = firebase.database();

export default app