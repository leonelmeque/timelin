import firebase from 'firebase';
import { TimelineEventProps } from '../../shared-types';

export const addTimelineEvent = async (
  uid: string,
  payload: TimelineEventProps
) => {
  const ref = firebase
    .firestore()
    .collection('timelines')
    .doc(uid)
    .collection('events')
    .doc();

  await ref.set({
    ...payload,
    id: ref.id,
  });

  return {
    ...payload,
    id: ref.id,
  };
};
