import { apiClient } from '../../../services/api-client';
import { User } from '../../shared-types';

export const getUserInformation = async (id: string) => {
  return apiClient.get<User>(`/users/${id}`);
};
