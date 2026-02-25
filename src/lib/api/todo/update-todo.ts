import { apiClient } from '../../../services/api-client';
import { TodoProps } from '../../shared-types';

export const updateTodo = async (
  id: string,
  payload: TodoProps,
) => {
  await apiClient.put(`/todos/${id}`, payload);
};
