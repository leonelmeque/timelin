import { TodoProps } from '../shared-types';
import { TODO_URL } from '../utils/constants';

const headers = {
  'Content-Type': 'application/json',
};

export const updateTodo = async (
  id: string,
  payload: TodoProps,
  signal: AbortController['signal']
) => {

  const options = {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers,
    signal,
  }

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

export const getTodos = async (ids: string[]) => {
  const params = new URLSearchParams({
    ids: ids.toString(),
  }).toString();

  const resp = await fetch(`${TODO_URL}/all?${params}`);
  const data = await resp.json();

  return data;
};
