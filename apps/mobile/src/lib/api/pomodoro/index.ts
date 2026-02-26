import { apiClient } from '../../../services/api-client';
import { PomodoroSession } from '../../shared-types';

export const pomodoro = {
  start: (todoId: string, type: 'work' | 'break', durationMinutes: number) =>
    apiClient.post<PomodoroSession>(`/pomodoro/${todoId}/start`, { type, durationMinutes }),

  complete: (todoId: string, sessionId: string) =>
    apiClient.post<PomodoroSession>(`/pomodoro/${todoId}/complete/${sessionId}`),

  cancel: (todoId: string, sessionId: string) =>
    apiClient.post<PomodoroSession>(`/pomodoro/${todoId}/cancel/${sessionId}`),

  getByTodo: (todoId: string) =>
    apiClient.get<PomodoroSession[]>(`/pomodoro/${todoId}`),

  getAll: () =>
    apiClient.get<PomodoroSession[]>('/pomodoro'),
};
