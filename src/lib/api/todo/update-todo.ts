import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth"
import { TodoProps } from '../../shared-types';

export const updateTodo = async (
  id: string,
  payload: TodoProps,
) => {
  await firestore()
    .collection("todos")
    .doc(auth().currentUser?.uid)
    .collection("list")
    .doc(id)
    .set(payload);
};
