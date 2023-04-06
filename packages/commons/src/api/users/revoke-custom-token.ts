import { USERS_URL, headers } from "../../utils/constants";

export const revokeCustomToken = async (id: string) => {
  const resp = await fetch(`${USERS_URL}/revoke-custom-token/${id}`, {
    method: 'DELETE',
    headers,
  });

  const data = await resp.json();

  return data;
};