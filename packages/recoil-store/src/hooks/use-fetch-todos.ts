import { api } from '@todo/commons';
import { useEffect } from 'react';
import { useRecoilStateLoadable, useSetRecoilState } from 'recoil';
import { todosState } from '../atoms/todos.atom';

export const useFetchTodos = (uid: string[]) => {
  const setTodoState = useSetRecoilState(todosState);

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

  const [state, setState] = useRecoilStateLoadable(todosState);

  return [state, setState] as const;
};
