import { UserLogin } from 'lib/shared-types';
import { getUserInformation } from './get-user-information';
import firebase from 'firebase/app';
import "firebase/auth"

export const userSignIn = async ({
  username,
  password,
}: Partial<UserLogin>) => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
  const ref = await firebase
    .auth()
    .signInWithEmailAndPassword(username as string, password as string);

  const userData = await getUserInformation(ref?.user?.uid || '');
  const sessionToken = ref.user?.refreshToken;

  return { userData, sessionToken };
};
