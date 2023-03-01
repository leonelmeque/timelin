const API_URL = import.meta.env.VITE_TODO_API;

const timelineURL = `${API_URL}/timeline`;

const headers = {
  'Content-Type': 'application/json',
};

export const getTimeline = async (id: string) => {
  const resp = await fetch(`${timelineURL}/find/${id}`, { headers });
  const data = await resp.json();

  return data;
};

export const getTimelineEvent = async (id: string) => {
  const resp = await fetch(`${timelineURL}/find/${id}/events`, { headers });
  const data = await resp.json();

  return data;
}

export const addTimelineEvent = async (id: string, payload: any) => {
  const resp = await fetch(`${timelineURL}/save/${id}/events`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers,
  });
  const data = await resp.json();

  return data;
}
