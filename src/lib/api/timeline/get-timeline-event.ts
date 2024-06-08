import firestore from "@react-native-firebase/firestore";

export const getTimelineEvent = async (uid: string, id: string) =>
    firestore()
    .collection('timelines')
    .doc(uid)
    .collection('events')
    .doc(id)
    .get();
