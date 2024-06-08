import firestore from "@react-native-firebase/firestore";

export const getTimeline = async (uid: string) => {
  const res = await firestore()
    .collection('timelines')
    .doc(uid)
    .collection('events')
    .get();

  return res.docs.map((doc) => doc.data());
};
