import { TodoProps } from "../../shared-types";
import { TODO_URL, headers } from "../../utils/constants";

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