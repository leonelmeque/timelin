import { TIMELINE_URL, headers } from "../../utils/constants";

export const addTimelineEvent = async (id: string, payload: Event[]) => {
  const resp = await fetch(`${TIMELINE_URL}/save/${id}`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers,
  });
  const data = await resp.json();

  return data;
};