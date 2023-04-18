import firebase from 'firebase/app';

export const addPinnedTodo = async (uid: string) => {
  return await firebase
    .firestore()
    .collection('todos')
    .doc(firebase.auth().currentUser?.uid)
    .update({
      pinned: uid,
    });
};
