import { apiClient } from '../../../services/api-client';
import { RetroSummary } from '../../shared-types';

export const retro = {
  getTodoRetro: (todoId: string) =>
    apiClient.get<RetroSummary>(`/retro/todo/${todoId}`),

  getPeriodRetro: (period: 'day' | 'week' | 'month', date?: string) => {
    const params = date ? `?date=${encodeURIComponent(date)}` : '';
    return apiClient.get<RetroSummary>(`/retro/period/${period}${params}`);
  },
};
