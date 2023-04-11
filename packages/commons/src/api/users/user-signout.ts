import firebase from 'firebase';

export const userSignOut = async () => {
  await firebase.auth().signOut();
};
