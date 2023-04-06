import { TIMELINE_URL, headers } from "../../utils/constants";

export const getTimeline = async (id: string) => {
  const resp = await fetch(`${TIMELINE_URL}/find/${id}`, { headers });
  const data = await resp.json();

  return data;
};