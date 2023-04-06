import { TIMELINE_URL, headers } from "../../utils/constants";

export const deleteTimelineEvent = async (id: string, eventId: string[]) => {
  const resp = await fetch(`${TIMELINE_URL}/remove/${id}`, {
    method: 'DELETE',
    headers,
    body: JSON.stringify(eventId),
  });
  const data = await resp.json();

  return data;
};
