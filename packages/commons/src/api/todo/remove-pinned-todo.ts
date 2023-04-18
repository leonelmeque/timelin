import firebase from 'firebase/app';

export const removePinnedTodo = async (id: string) => {
  return await firebase
    .firestore()
    .collection('todos')
    .doc(firebase.auth().currentUser?.uid)
    .update({
      pinned: '',
    });
};
