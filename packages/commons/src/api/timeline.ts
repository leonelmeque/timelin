import { TIMELINE_URL } from '../utils/constants';

const headers = {
  'Content-Type': 'application/json',
};

export const getTimeline = async (id: string) => {
  const resp = await fetch(`${TIMELINE_URL}/find/${id}`, { headers });
  const data = await resp.json();

  return data;
};

export const getTimelineEvent = async (id: string) => {
  const resp = await fetch(`${TIMELINE_URL}/find/${id}`, { headers });
  const data = await resp.json();

  return data;
};

export const addTimelineEvent = async (id: string, payload: Event[]) => {
  const resp = await fetch(`${TIMELINE_URL}/save/${id}`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers,
  });
  const data = await resp.json();

  return data;
};

export const deleteTimelineEvent = async (id: string, eventId: string[]) => {
  const resp = await fetch(`${TIMELINE_URL}/remove/${id}`, {
    method: 'DELETE',
    headers,
    body: JSON.stringify(eventId),
  });
  const data = await resp.json();

  return data;
};

export const deleteTimeline = async (id: string) => {
  const resp = await fetch(`${TIMELINE_URL}/remove/all/${id}`, {
    method: 'DELETE',
    headers,
  });
  const data = await resp.json();

  return data;
};
