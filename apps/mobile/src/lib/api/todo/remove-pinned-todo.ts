import { apiClient } from '../../../services/api-client';

export const removePinnedTodo = async (_id: string) => {
  await apiClient.delete('/todos/meta/pinned');
};
