import { api, TodoProps } from '@todo/commons';
import { selectorFamily } from 'recoil';

export const getTodosQuery = selectorFamily<TodoProps[], { uid: string[] }>({
  key: 'todos',
  get: (params) => async () => {
    try {
      const res = await api.todo.getTodos(params.uid);
      const { message, result } = res;
      return result.todos;
    } catch (err) {
      throw err;
    }
  },
});
