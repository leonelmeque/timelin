import { api } from '@todo/commons';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { todosState } from '../todos/todos.store';

export const useFetchTodos = () => {
  const [state, setTodoState] = useAtom(todosState);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await api.todo.getTodos();
        setTodoState(data);
      } catch (err) {
        throw err;
      }
    }

    fetchData();
  }, [setTodoState]);

  return [state, setTodoState] as const;
};
