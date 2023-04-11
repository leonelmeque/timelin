import firebase from 'firebase';
import { User } from '../../shared-types';
import { generateUserData } from './generate-user-data';

export async function userSignUp<T>(
  data: Partial<User & { [key: string]: any }>
) {
  const { email, username, password } = data;

  const result = await firebase
    .auth()
    .createUserWithEmailAndPassword(email as string, password as string);

  const user = await generateUserData({
    username: username as string,
    email: email as string,
    id: result.user?.uid as string,
  });

  return user;
}
