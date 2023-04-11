import firebase from 'firebase';
import { TodoProps } from '../../shared-types';

export const getTodos = async () => {
  const ref = firebase
    .firestore()
    .collection('todos')
    .doc(firebase.auth().currentUser?.uid)
    .collection('list');
  const res = await ref.get();

  return res.docs.map((doc) => doc.data()) as TodoProps[];
};
