import { TODO_URL, headers } from "../../utils/constants";

export const deleteTodo = async (id: string) => {
  const resp = await fetch(`${TODO_URL}/remove/${id}`, {
    method: 'DELETE',
    headers,
  });

  const data = await resp.json();

  return data;
};
