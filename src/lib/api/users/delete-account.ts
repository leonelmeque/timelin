import { apiClient } from '../../../services/api-client';
import { authState } from '../../../services/auth-state';

export const deleteAccount = async () => {
  await apiClient.delete('/auth/account');
  authState.clear();
};
