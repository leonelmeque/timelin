import firebase from 'firebase/app';
import Constants from "expo-constants"

export const config = {
  projectId: Constants?.expoConfig?.extra?.projectId,
  apiKey: Constants?.expoConfig?.extra?.apiKey,
  authDomain: Constants?.expoConfig?.extra?.authDomain,
  databaseURL: Constants?.expoConfig?.extra?.databaseURL,
  storageBucket: Constants?.expoConfig?.extra?.storageBucket,
  messagingSenderId: Constants?.expoConfig?.extra?.messagingSenderId,
  appId: Constants?.expoConfig?.extra?.appId,
  measurementId: Constants?.expoConfig?.extra?.measurementId,
};

export function initializeFirebaseApplication() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)

  } else {
    firebase.app()
  }
}
