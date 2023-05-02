import firebase from 'firebase/app';

export const deleteTimelineEvent = async (uid: string, eventId: string) => {
  return await firebase
    .firestore()
    .collection('timelines')
    .doc(uid)
    .collection('events')
    .doc(eventId)
    .delete();
};
