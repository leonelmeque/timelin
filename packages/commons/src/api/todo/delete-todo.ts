import firebase from 'firebase';

export const deleteTodo = async (id: string) => {
  await firebase
    .firestore()
    .collection('todos')
    .doc(firebase.auth().currentUser?.uid)
    .collection('list')
    .doc(id)
    .delete();
};
