import { TodoProps } from "../../shared-types";
import { TODO_URL, headers } from "../../utils/constants";

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