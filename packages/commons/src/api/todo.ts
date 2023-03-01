import { TodoProps } from '../shared-types';

const API_URL = import.meta.env.VITE_TODO_API;
const todosURL = `${API_URL}/todos`;

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

  const resp = await fetch(`${todosURL}/${id}`, options);
  const data = await resp.json();

  return data;
};

export const deleteTodo = async (id: string) => {
  const resp = await fetch(`${todosURL}/${id}`, {
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

  const resp = await fetch(`${todosURL}/all?${params}`);
  const data = await resp.json();

  return data;
};
