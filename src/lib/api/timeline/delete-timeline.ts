import firestore from '@react-native-firebase/firestore';

export const deleteTimeline = async (uid: string) => {
  const docRef = firestore()
      .collection('timelines')
      .doc(uid)

  await docRef.delete()
}
