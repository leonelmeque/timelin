import firebase from 'firebase';
import { TodoProps } from '../../shared-types';

export const getTodo = async (id: string) => {
  const ref = firebase
    .firestore()
    .collection('todos')
    .doc(firebase.auth().currentUser?.uid)
    .collection('list')
    .doc(id);

  const snapshot = await ref.get();

  return snapshot.data() as TodoProps;
};
