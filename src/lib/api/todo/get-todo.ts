import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth"
import { TodoProps } from '../../shared-types';

export const getTodo = async (id: string) => {
  const ref = firestore()
    .collection('todos')
    .doc(auth().currentUser?.uid)
    .collection('list')
    .doc(id);

  const snapshot = await ref.get();

  return snapshot.data() as TodoProps;
};
