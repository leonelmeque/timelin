import { apiClient } from '../../../services/api-client';
import { User } from '../../shared-types';

export const generateUserData = async (
  payload: Partial<User>
) => {
  return apiClient.post<User>(`/users/${payload.id}`, payload);
};
