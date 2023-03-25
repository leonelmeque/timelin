import { TodoProps } from '../shared-types';
import { TODO_URL } from '../utils/constants';

const headers = {
  'Content-Type': 'application/json',
};

export const createTodo = async (todo: TodoProps) => {
  const payload = {
    todo,
  };

  const resp = await fetch(`${TODO_URL}/save`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers,
  });

  const data = await resp.json();

  return data;
};

export const updateTodo = async (
  id: string,
  payload: TodoProps,
  signal: AbortController['signal']
) => {
  const options = {
    method: 'PUT',
    body: JSON.stringify({ todo: payload }),
    headers,
    signal,
  };

  const resp = await fetch(`${TODO_URL}/update/${id}`, options);
  const data = await resp.json();

  return data;
};

export const deleteTodo = async (id: string) => {
  const resp = await fetch(`${TODO_URL}/remove/${id}`, {
    method: 'DELETE',
    headers,
  });

  const data = await resp.json();

  return data;
};

export const getTodos = async (uid: string[]) => {

  const resp = await fetch(`${TODO_URL}/find-multiple`, {
    method: 'POST',
    body: JSON.stringify({ uid }),
    headers,
  });

  const data = await resp.json();

  if (resp.status === 404) {
    throw new Error(data.message);
  }

  return data;
};

export const getTodo = async (id: string) => {
  const resp = await fetch(`${TODO_URL}/find/${id}`);
  const data = await resp.json();

  if (resp.status === 404) {
    throw new Error(data.message);
  }

  return data;
};
