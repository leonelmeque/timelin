import { TODO_URL } from "../../utils/constants";

export const getTodo = async (id: string) => {
  const resp = await fetch(`${TODO_URL}/find/${id}`);
  const data = await resp.json();

  if (resp.status === 404) {
    throw new Error(data.message);
  }

  return data;
};
