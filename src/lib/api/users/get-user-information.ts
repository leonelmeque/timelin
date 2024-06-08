import firestore from "@react-native-firebase/firestore";
import { User } from '../../shared-types';

export const getUserInformation = async (id: string) => {
  const ref = firestore().collection('users').doc(id);
  const res = await ref.get();

  return res.data() as User;
};
