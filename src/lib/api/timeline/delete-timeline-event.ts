import firestore from "@react-native-firebase/firestore";

export const deleteTimelineEvent = async (uid: string, eventId: string) =>  firestore()
    .collection('timelines')
    .doc(uid)
    .collection('events')
    .doc(eventId)
    .delete();
