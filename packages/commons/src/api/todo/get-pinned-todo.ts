import firebase from 'firebase/app';

export const getPinnedTodo = async () => {
  const ref = await firebase
    .firestore()
    .collection(`todos`)
    .doc(firebase.auth().currentUser?.uid)
    .get();

  return ref.data();
};
