import firebase from 'firebase/app';

export const deleteTimeline = async (uid: string) => {
  return await firebase
    .firestore()
    .collection('timelines')
    .doc(uid)
    .delete();
};
