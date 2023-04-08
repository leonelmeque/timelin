import { User } from '../../shared-types';
import firebase from 'firebase';

export const generateUserData = async (
  payload: Pick<User, 'email' | 'username' | 'id'>
) => {
  await firebase.firestore().collection('users').doc(payload.id).set(payload);

  return {
    ...payload,
  };
};
