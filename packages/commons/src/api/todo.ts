import { TodoProps } from '../shared-types';

const todosURL = 'http://localhost:3001/todos';

const headers = {
  'Content-Type': 'application/json',
};

export const updateTodo = async (
  id: string,
  payload: TodoProps,
  signal: AbortController['signal']
) => {
  const resp = await fetch(`${todosURL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers,
    signal,
  });
  const data = resp.json();

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

export const getTodos = async () => {
  const resp = await fetch(todosURL);
  const data = await resp.json();

  return data;
};

