import { TODO_URL, headers } from "../../utils/constants";

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

