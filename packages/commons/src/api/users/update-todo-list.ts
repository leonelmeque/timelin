import { USERS_URL, headers } from "../../utils/constants";

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