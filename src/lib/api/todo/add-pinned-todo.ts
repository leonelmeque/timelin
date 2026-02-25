import { apiClient } from '../../../services/api-client';

export const addPinnedTodo = async (uid: string) => {
  await apiClient.put('/todos/meta/pinned', { uid });
};
