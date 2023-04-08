import firebase from 'firebase';

export const getTimelineEvent = async (id: string) => {
  return await firebase
    .firestore()
    .collection('timeline')
    .doc(firebase.auth()?.currentUser?.uid)
    .collection('events')
    .doc(id)
    .get();
};
