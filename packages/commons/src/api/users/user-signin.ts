import { UserLogin } from '../../shared-types';
import { getUserInformation } from './get-user-information';
import firebase from 'firebase';

export const userSignIn = async ({
  username,
  password,
}: Partial<UserLogin>) => {
  const ref = await firebase
    .auth()
    .signInWithEmailAndPassword(username as string, password as string);

  const userData = await getUserInformation(ref?.user?.uid || '');
  const sessionToken = await ref.user?.refreshToken;

  return { userData, sessionToken };
};
