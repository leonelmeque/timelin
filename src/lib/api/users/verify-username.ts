import { apiClient } from '../../../services/api-client';

export const verifyUsername = async (username: string) => {
  const result = await apiClient.get<{ exists: boolean }>(
    `/users?username=${encodeURIComponent(username)}`
  );
  return result.exists;
};
