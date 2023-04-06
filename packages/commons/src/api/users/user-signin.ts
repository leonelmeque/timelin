import { User, UserLogin } from "../../shared-types";
import { USERS_URL, headers } from "../../utils/constants";

export const userSignIn = async ({
  username,
  password,
}: Partial<UserLogin>): Promise<{ message: string; user: User }> => {
  const resp = await fetch(`${USERS_URL}/auth`, {
    method: 'POST',
    body: JSON.stringify({
      user: {
        username,
        password,
      },
    }),
    headers,
  });
  const data = await resp.json();

  return data;
};
