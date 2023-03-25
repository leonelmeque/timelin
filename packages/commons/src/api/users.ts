import { User } from '../shared-types';
import { USERS_URL } from '../utils/constants';

const headers = {
  'Content-Type': 'application/json',
};

export const getUserInformation = async (id: string) => {
  const resp = await fetch(`${USERS_URL}/find/${id}`, { headers });
  const data = await resp.json();

  return data;
};

export const createCustomToken = async (id: string) => {
  const resp = await fetch(`${USERS_URL}/custom-token`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ id }),
  });
  const data = await resp.json();

  return data;
};

export const updateTodoList = async (uid: string, newTodo: string[]) => {
  const payload = {
    user: {
      todos: newTodo
    }
  }
  const resp = await fetch(`${USERS_URL}/update/${uid}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(payload),
  });
  const data = await resp.json();

  return data;
};

export const revokeCustomToken = async (id: string) => {
  const resp = await fetch(`${USERS_URL}/revoke-custom-token/${id}`, {
    method: 'DELETE',
    headers,
  });

  const data = await resp.json();

  return data;
};

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

type UserLogin = Pick<User, 'username' | 'password'>;

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
