const timelineURL = 'http://localhost:3001/timeline';

const headers = {
  'Content-Type': 'application/json',
};

export const getTimeline = async (id: string) => {
  const resp = await fetch(`${timelineURL}/${id}`, { headers });
  const data = await resp.json();

  return data;
};
