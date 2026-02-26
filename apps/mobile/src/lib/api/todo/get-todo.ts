import { apiClient } from '../../../services/api-client';
import { TodoProps } from '../../shared-types';

export const getTodo = async (id: string) => {
  return apiClient.get<TodoProps>(`/todos/${id}`);
};
