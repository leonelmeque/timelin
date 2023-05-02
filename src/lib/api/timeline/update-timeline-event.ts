import firebase from 'firebase/app';
import { TimelineEventProps } from '../../shared-types';

export const updateTimelineEvent = async (
  uid: string,
  eventID: string,
  payload: TimelineEventProps
) => {
  return await firebase
    .firestore()
    .collection('timelines')
    .doc(uid)
    .collection('events')
    .doc(eventID)
    .update({
      ...payload,
    });
};
