import firebase from 'firebase/app';
import "firebase/auth"
import { getUserInformation } from './get-user-information';

export const userSignInWithPersistence = () => {
  // firebase.auth()
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          getUserInformation(user.uid)
            .then((user) => {
              resolve(user);
            })
            .catch((err) => {
              unsubscribe();
              reject(err);
            });
        } else {
          unsubscribe();
          resolve(null);
        }
      },
      (err) => {
        unsubscribe();
        reject(err);
      }
    );
  });
};
