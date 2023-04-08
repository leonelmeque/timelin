import firebase from 'firebase';

export const deleteTimelineEvent = async (eventId: string) => {
  return await firebase
    .firestore()
    .collection('timeline')
    .doc(firebase.auth()?.currentUser?.uid)
    .collection('events')
    .doc(eventId)
    .delete();
};
