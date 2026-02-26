import { apiClient } from '../../../services/api-client';
import { TodoProps } from '../../shared-types';

export const getTodos = async () => {
  return apiClient.get<TodoProps[]>('/todos');
};
