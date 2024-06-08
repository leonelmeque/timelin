import { initializeApp, getApp, getApps } from "@react-native-firebase/app";
import { getFirestore } from "firebase/firestore";

import Constants from "expo-constants";

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

const initFirebase = () => {
  let app = null;
  const apps = getApps();

  if (!apps.length) {
    app = initializeApp(config);
  } else {
    app = getApp();
  }

  return app
}

initFirebase()
