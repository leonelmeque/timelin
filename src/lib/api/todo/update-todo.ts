import firebase from 'firebase/app';
import { TodoProps } from '../../shared-types';

export const updateTodo = async (
  id: string,
  payload: TodoProps,
) => {
  await firebase
    .firestore()
    .collection("todos")
    .doc(firebase.auth().currentUser?.uid)
    .collection("list")
    .doc(id)
    .set(payload);
};
