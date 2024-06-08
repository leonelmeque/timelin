import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth"
import { TodoProps } from '../../shared-types';

export const createTodo = async (todo: TodoProps) => {
  const userUID = auth().currentUser?.uid
  const ref = await firestore()
    .collection('todos')
    .doc(userUID)
    .collection('list')
    .add({});

  await ref.set({
    id: ref.id,
    ...todo,
    creator: userUID
  });

  return {
    ...todo,
    creator: userUID,
    id: ref.id,
  };
};
