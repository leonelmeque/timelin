import { api, TimelineEventProps } from '@todo/commons';
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

export const timelineState = atom(<TimelineEventProps[]>[]);

export const readWriteTimelineState = atom(
  (get) => get(timelineState),
  (get, set, update) => {
    set(timelineState, update as any);
  }
);

export const getAsyncTimelineAtom = atomFamily((uid: string) =>
  atom(async () => {
    return await api.timeline.getTimeline(uid);
  })
);