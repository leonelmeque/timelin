import { TimelineEventProps } from '../shared-types';

export const eventsDateSorter = (arr: TimelineEventProps[]) => {
  return arr.sort((a, b) => {
    if (a.timestamp < b.timestamp) {
      return -1;
    }
    if (a.timestamp > b.timestamp) {
      return 1;
    }
    return 0;
  });
};
