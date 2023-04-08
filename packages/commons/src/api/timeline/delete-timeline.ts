import firebase from 'firebase';

export const deleteTimeline = async (id: string) => {
  return await firebase
    .firestore()
    .collection('timeline')
    .doc(firebase.auth()?.currentUser?.uid)
    .delete();
};
