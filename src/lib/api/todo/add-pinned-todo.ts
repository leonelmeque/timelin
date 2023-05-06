import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const addPinnedTodo = async (uid: string) => {
  return await firebase
    .firestore()
    .collection('todos')
    .doc(firebase.auth().currentUser?.uid)
    .update({
      pinned: uid,
    });
};
