import { apiClient } from '../../../services/api-client';
import { authState } from '../../../services/auth-state';
import { User } from '../../shared-types';

export async function userSignUp<T>(
  data: Partial<User & { [key: string]: any }>
) {
  const { email, username, password } = data;

  const result = await apiClient.post<{
    user: { uid: string; email: string; displayName: string | null; photoURL: string | null };
    userData: User;
    sessionToken: string;
  }>('/auth/signup', { email, username, password });

  authState.setUser({
    uid: result.user.uid,
    email: result.user.email,
    displayName: result.user.displayName,
    photoURL: result.user.photoURL,
    emailVerified: false,
    phoneNumber: null,
  });

  return result.userData;
}
