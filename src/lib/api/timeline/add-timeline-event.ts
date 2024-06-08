import firestore from '@react-native-firebase/firestore';
import { TimelineEventProps } from '../../shared-types';

export const addTimelineEvent = async (
  uid: string,
  payload: TimelineEventProps
) => {
  const ref = firestore()
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
