import auth from '@react-native-firebase/auth';
import { generateUserData } from './generate-user-data';
import { User } from '../../shared-types';

export async function userSignUp<T>(
  data: Partial<User & { [key: string]: any }>
) {
  const { email, username, password } = data;

  const result = await auth()
    .createUserWithEmailAndPassword(email as string, password as string);

  return generateUserData({
    username: username as string,
    email: email as string,
    id: result.user?.uid as string,
    birthdate: '',
    preferences: {},
    phonenumber: {
      countryCode: '',
      number: '',
    },
  });
}
