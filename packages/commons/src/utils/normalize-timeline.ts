import { TimelineEventProps, TimelineProps } from '../shared-types';

export const normalizeTimeline = (timeline: TimelineProps) => {
  if (!timeline) return [];

  const normalizedData: { [key in string]: TimelineEventProps[] } = {};

  Object.entries(timeline.events).forEach(
    ([key, { timestamp, ...rest }], index) => {
      const dateKey = new Date(Number(timestamp)).toLocaleDateString('en-US');

      normalizedData[dateKey]
        ? normalizedData[dateKey]?.push({ timestamp, ...rest })
        : (normalizedData[dateKey] = [{ timestamp, ...rest }]);
    }
  );

  return normalizedData;
};
