import firebase from 'firebase';

export const deleteTimeline = async (uid: string) => {
  return await firebase
    .firestore()
    .collection('timelines')
    .doc(uid)
    .delete();
};
