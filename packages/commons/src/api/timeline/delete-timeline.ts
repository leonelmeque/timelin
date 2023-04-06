import { TIMELINE_URL, headers } from "../../utils/constants";

export const deleteTimeline = async (id: string) => {
  const resp = await fetch(`${TIMELINE_URL}/remove/all/${id}`, {
    method: 'DELETE',
    headers,
  });
  const data = await resp.json();

  return data;
};
