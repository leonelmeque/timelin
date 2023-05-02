import firebase from 'firebase/app';

export const userSignOut = async () => {
  await firebase.auth().signOut();
  await firebase.auth().currentUser?.delete();
};
