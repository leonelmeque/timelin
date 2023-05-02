import firebase from 'firebase/app';

export const getTimeline = async (uid: string) => {
  const res = await firebase
    .firestore()
    .collection('timelines')
    .doc(uid)
    .collection('events')
    .get();

  return res.docs.map((doc) => doc.data());
};
