import firebase from 'firebase';
import { User } from '../../shared-types';

export const getUserInformation = async (id: string) => {
  const ref = firebase.firestore().collection('users').doc(id);
  const res = await ref.get();

  return res.data() as User;
};
