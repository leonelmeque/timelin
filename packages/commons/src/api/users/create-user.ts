import { User } from "../../shared-types";
import { USERS_URL, headers } from "../../utils/constants";

export const createUser = async (
  payload: Pick<User, 'email' | 'username' | 'id'>
) => {
  const resp = await fetch(`${USERS_URL}/create`, {
    method: 'POST',
    body: JSON.stringify({
      user: payload,
    }),
    headers,
  });
  const data = await resp.json();

  return data;
};