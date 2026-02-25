import { apiClient } from '../../../services/api-client';

export const deleteTimeline = async (uid: string) => {
  await apiClient.delete(`/timelines/${uid}`);
};
