import { apiClient } from '../../../services/api-client';

export const getPinnedTodo = async () => {
  return apiClient.get<{ pinned?: string }>('/todos/meta/pinned');
};
