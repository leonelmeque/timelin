import { User } from '../../shared-types';
import firebase from 'firebase/app';

export const generateUserData = async (
  payload: Partial<User>
) => {
  await firebase.firestore().collection('users').doc(payload.id).set(payload);

  return {
    ...payload as User,
  };
};
