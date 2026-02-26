import { apiClient } from '../../../services/api-client';

export const getLastestChanged = async () => {
  return apiClient.get<{ latestChanged?: string }>('/todos/meta/latest');
};
