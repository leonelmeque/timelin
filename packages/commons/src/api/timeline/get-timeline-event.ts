import firebase from 'firebase';

export const getTimelineEvent = async (uid: string, id: string) => {
  return await firebase
    .firestore()
    .collection('timelines')
    .doc(uid)
    .collection('events')
    .doc(id)
    .get();
};
