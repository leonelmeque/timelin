import { TodoProps } from '../shared-types';
import { useEffect, useState } from 'react';
import { api } from '../api';

export const useFetchTodos = (uid: string[]) => {
  const [state, setState] = useState<TodoProps[] | null>(null);

  useEffect(() => {
    api.todo
      .getTodos(uid)
      .then(({ _message, result }) => {
        setState(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return state;
};
