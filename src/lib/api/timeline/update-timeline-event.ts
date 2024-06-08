import firestore from "@react-native-firebase/firestore";
import { TimelineEventProps } from '../../shared-types';

export const updateTimelineEvent = async (
  uid: string,
  eventID: string,
  payload: TimelineEventProps
) => firestore()
    .collection('timelines')
    .doc(uid)
    .collection('events')
    .doc(eventID)
    .update({
      ...payload,
    });
