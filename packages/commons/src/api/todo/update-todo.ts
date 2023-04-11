import { TodoProps } from '../../shared-types';
import firebase from 'firebase';

export const updateTodo = async (
  id: string,
  payload: TodoProps,
  signal: AbortController['signal']
) => {
  await firebase
    .firestore()
    .collection('todos')
    .doc(firebase.auth().currentUser?.uid)
    .collection('list')
    .doc(id)
    .update(payload);
};
