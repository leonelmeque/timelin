import { apiClient } from '../../../services/api-client';
import { TodoProps } from '../../shared-types';

export const createTodo = async (todo: TodoProps) => {
  return apiClient.post<TodoProps>('/todos', todo);
};
