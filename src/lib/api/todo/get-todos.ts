import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth"
import { TodoProps } from '../../shared-types';

export const getTodos = async () => {
  const ref = firestore()
    .collection('todos')
    .doc(auth().currentUser?.uid)
    .collection('list');
  const res = await ref.get();

  return res.docs.map((doc) => doc.data()) as TodoProps[];
};
