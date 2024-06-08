import auth from "@react-native-firebase/auth"
import { getUserInformation } from './get-user-information';
import { UserLogin } from '../../shared-types';

export const userSignIn = async ({
  username,
  password,
}: Partial<UserLogin>) => {

  const ref = await auth()
    .signInWithEmailAndPassword(username as string, password as string);

  const userData = await getUserInformation(ref?.user?.uid ?? '');
  const sessionToken = await ref.user?.getIdToken();

  return { userData, sessionToken };
};
