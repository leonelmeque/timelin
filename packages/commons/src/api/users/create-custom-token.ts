import { USERS_URL, headers } from "../../utils/constants";

export const createCustomToken = async (id: string) => {
  const resp = await fetch(`${USERS_URL}/custom-token`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ id }),
  });
  const data = await resp.json();

  return data;
};