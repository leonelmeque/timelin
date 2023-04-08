import firebase from 'firebase';

export const getTimeline = async () => {
  return await firebase
    .firestore()
    .collection('timeline')
    .doc(firebase.auth().currentUser?.uid)
    .get();
};
