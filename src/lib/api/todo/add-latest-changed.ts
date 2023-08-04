import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const addLatestChanged = async (uid: string) => {
  return await firebase
    .firestore()
    .collection("todos")
    .doc(firebase.auth().currentUser?.uid)
    .set({
      latestChanged: uid,
    });
};
