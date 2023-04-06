import { USERS_URL, headers } from "../../utils/constants";

export const getUserInformation = async (id: string) => {
  const resp = await fetch(`${USERS_URL}/find/${id}`, { headers });
  const data = await resp.json();

  return data;
};