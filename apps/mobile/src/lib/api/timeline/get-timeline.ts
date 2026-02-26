import { apiClient } from '../../../services/api-client';
import { TimelineEventProps } from '../../shared-types';

export const getTimeline = async (uid: string) => {
  return apiClient.get<TimelineEventProps[]>(`/timelines/${uid}/events`);
};
