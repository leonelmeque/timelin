import { apiClient } from '../../../services/api-client';

export const deleteTimelineEvent = async (uid: string, eventId: string) => {
  await apiClient.delete(`/timelines/${uid}/events/${eventId}`);
};
