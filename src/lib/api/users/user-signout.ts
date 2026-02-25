import { apiClient } from '../../../services/api-client';
import { authState } from '../../../services/auth-state';

export const userSignOut = async () => {
  await apiClient.post('/auth/signout');
  authState.clear();
};
