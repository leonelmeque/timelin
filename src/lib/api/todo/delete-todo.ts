import { apiClient } from '../../../services/api-client';

export const deleteTodo = async (id: string) => {
  await apiClient.delete(`/todos/${id}`);
};
