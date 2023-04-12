import firebase from 'firebase/app';
import { getUserInformation } from './get-user-information';

export const userSignInWithPersistence = (callback: Function) => {
  firebase.auth().onAuthStateChanged(
    async (user) => {
      if (user) {
        const userData = await getUserInformation(user.uid);
        callback(userData);
        return;
      }
      callback(null);
    },
    (error) => error
  );
};
