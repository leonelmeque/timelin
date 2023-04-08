import { TodoProps } from '../../shared-types';
import firebase from 'firebase';

export const createTodo = async (todo: TodoProps) => {
  const ref = firebase
    .firestore()
    .collection('todos')
    .doc(firebase.auth().currentUser?.uid)
    .collection('list')
    .doc();

  await ref.set({
    ...todo,
    id: ref.id,
  });

  return {
    ...todo,
    id: ref.id,
  };
};
