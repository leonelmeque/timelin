import { apiClient } from '../../../services/api-client';

export const addLatestChanged = async (uid: string) => {
  await apiClient.put('/todos/meta/latest', { uid });
};
