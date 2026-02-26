import { apiClient } from '../../../services/api-client';
import { TimelineEventProps } from '../../shared-types';

export const updateTimelineEvent = async (
  uid: string,
  eventID: string,
  payload: TimelineEventProps
) => {
  await apiClient.put(`/timelines/${uid}/events/${eventID}`, payload);
};
