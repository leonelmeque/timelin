import { TimelineEventProps } from '../shared-types';
import { eventsDateSorter } from './events-date-sorter';

export const normalizeTimeline = (timeline: TimelineEventProps[]) => {
  if (!timeline.length) return {} as { [key in string]: TimelineEventProps[] };

  const normalizedData: { [key in string]: TimelineEventProps[] } = {};

  const orderedTimeline = eventsDateSorter(timeline);

  Object.entries(orderedTimeline).forEach(
    ([key, { timestamp, ...rest }], index) => {
      const dateKey = new Date(Number(timestamp)).toLocaleDateString('en-US');

      normalizedData[dateKey]
        ? normalizedData[dateKey]?.push({ timestamp, ...rest })
        : (normalizedData[dateKey] = [{ timestamp, ...rest }]);
    }
  );

  return normalizedData;
};
