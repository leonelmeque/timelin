import { apiClient } from '../../../services/api-client';
import { authState } from '../../../services/auth-state';
import { User, UserLogin } from '../../shared-types';

export const userSignIn = async ({
  username,
  password,
}: Partial<UserLogin>) => {
  const result = await apiClient.post<{
    user: { uid: string; email: string; displayName: string | null; photoURL: string | null };
    userData: User;
    sessionToken: string;
  }>('/auth/signin', { email: username, password });

  authState.setUser({
    uid: result.user.uid,
    email: result.user.email,
    displayName: result.user.displayName,
    photoURL: result.user.photoURL,
    emailVerified: true,
    phoneNumber: null,
  });

  return { userData: result.userData, sessionToken: result.sessionToken };
};
