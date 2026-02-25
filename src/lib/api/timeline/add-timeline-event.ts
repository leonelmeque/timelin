import { apiClient } from '../../../services/api-client';
import { TimelineEventProps } from '../../shared-types';

export const addTimelineEvent = async (
  uid: string,
  payload: TimelineEventProps
) => {
  return apiClient.post<TimelineEventProps>(`/timelines/${uid}/events`, payload);
};
