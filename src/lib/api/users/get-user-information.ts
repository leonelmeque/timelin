import { User } from 'lib/shared-types';
import firebase from 'firebase/app';
import 'firebase/firestore';

export const getUserInformation = async (id: string) => {
  const ref = firebase.firestore().collection('users').doc(id);
  const res = await ref.get();

  return res.data() as User;
};
