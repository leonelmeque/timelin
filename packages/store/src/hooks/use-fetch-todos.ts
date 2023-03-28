import { api } from '@todo/commons';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { todosState } from '../todos/todos.store';

export const useFetchTodos = (uid: string[]) => {
  const [state, setTodoState] = useAtom(todosState);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.todo.getTodos(uid);
        const { message, result } = res;
        setTodoState(result.todos);
      } catch (err) {
        throw err;
      }
    }

    fetchData();
  }, [uid, setTodoState]);

  return [state, setTodoState] as const;
};
