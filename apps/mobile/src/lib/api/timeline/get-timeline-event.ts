import { apiClient } from '../../../services/api-client';
import { TimelineEventProps } from '../../shared-types';

export const getTimelineEvent = async (uid: string, id: string) => {
  return apiClient.get<TimelineEventProps>(`/timelines/${uid}/events/${id}`);
};
