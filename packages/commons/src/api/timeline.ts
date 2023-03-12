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
  const resp = await fetch(`${TIMELINE_URL}/find/${id}/events`, { headers });
  const data = await resp.json();

  return data;
};

export const addTimelineEvent = async (id: string, payload: any) => {
  const resp = await fetch(`${TIMELINE_URL}/save/${id}/events`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers,
  });
  const data = await resp.json();

  return data;
};

export const deleteTimelineEvent = async (id: string, eventId: string) => {
  const resp = await fetch(
    `${TIMELINE_URL}/remove/${id}/events?eventId=${eventId}`,
    {
      method: 'DELETE',
      headers,
    }
  );
  const data = await resp.json();

  return data;
};
