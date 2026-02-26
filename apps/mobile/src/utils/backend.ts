import { TodoProps } from "../lib";

const todosURL = 'http://localhost:3001/todos';

const headers = {
  'Content-Type': 'application/json',
};

const postTodos = async (payload: TodoProps) => {
  const resp = await fetch(`${todosURL}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
  const data = await resp.json();

  return data;
};

const getTodos = async () => {
  const resp = await fetch(todosURL);
  const data = await resp.json();

  return data;
};

const updateTodo = async (
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

const deleteTodo = async (id: string) => {
  const resp = await fetch(`${todosURL}/${id}`);
  const data = await resp.json();

  return data;
};

const todosAPI = {
  postTodos,
  getTodos,
  updateTodo,
  deleteTodo,
};

const userAPI = {};

export { todosAPI, userAPI };
