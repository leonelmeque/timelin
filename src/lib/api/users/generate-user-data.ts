import firestore from "@react-native-firebase/firestore";
import { User } from '../../shared-types';

export const generateUserData = async (
  payload: Partial<User>
) => {
  await firestore().collection('users').doc(payload.id).set(payload);

  return {
    ...payload as User,
  };
};
