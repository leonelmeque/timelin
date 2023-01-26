import { TodoProps } from '../shared-types';

const headers = {
  'Content-Type': 'application/json',
};

export const updateTodo = async (
  id: string,
  payload: TodoProps,
  signal: AbortController['signal']
) => {
  const resp = await fetch(`http://localhost:3001/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers,
    signal,
  });
  const data = resp.json();

  return data;
};
