import db from '../db/timeline.json';
import { TimelineEvent, Timeline } from '../types';
import { writeToDB } from '../utils/writedb';

const timeline = db.timeline as Timeline[];

export const getTimelineById = (id: string): Timeline | undefined => {
  if (!timeline.length) return;

  const _timeline = timeline.find((timeline) => timeline.id === id);

  if (!_timeline) throw new Error('Timeline was not found');

  return _timeline;
};

export const getTimelineEventById = (
  id: string,
  eventId: string
): TimelineEvent | undefined => {
  if (!timeline.length) return;

  const index = timeline.findIndex((timeline) => timeline.id === id);

  if (!timeline[index].events) return;

  return timeline[index].events.find((event) => event.id === eventId);
};

export const updateTimelineEvent = (
  id: string,
  eventId: string,
  payload: any
) => {
  if (!timeline.length) return;

  const index = timeline.findIndex((todo) => todo.id === id);
  if (index < 0) return;

  const eventIndex = timeline[index].events.findIndex(
    (timelineEvent) => timelineEvent.id === eventId
  );

  if (!eventIndex) return;

  timeline[index].events[eventIndex] = { eventId, ...payload };

  writeToDB('timeline', JSON.stringify(db));
};

export const saveTimelineEvent = (id: string, payload: TimelineEvent) => {
  if (!timeline.length) return;

  const index = timeline.findIndex((timeline) => timeline.id === id);

  if (index < 0) return;

  timeline[index].events.push(payload);

  const temp = db;

  writeToDB('timeline', JSON.stringify(temp));
};

export const deleteTimelineEvent = (id: string, eventId: string) => {
  if (!timeline.length) return;

  const index = timeline.findIndex((timeline) => timeline.id === id);

  if (index < 0) return;

  const temp = timeline[index].events.filter((event) => event.id !== eventId);

  timeline[index].events = temp;

  if (!temp.length) return;

  writeToDB('timeline', JSON.stringify(db));
};
