import { User } from '../shared-types';
import { USERS_URL } from '../utils/constants';

const headers = {
  'Content-Type': 'application/json',
};

// export const getUser = async (id: string) => {
//   const resp = await fetch(`${USERS_URL}/${id}`, { headers });
//   const data = await resp.json();

//   return data;
// }

export const createUser = async (
  payload: Pick<User, 'email' | 'username' | 'password'>
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

type UserLogin = Pick<User, 'username' | 'password'>;

export const userSignIn = async ({
  username,
  password,
}: Partial<UserLogin>): Promise<{ message: string, user: User }> => {
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