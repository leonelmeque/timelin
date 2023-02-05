import { TodoProps } from '@todo/commons';
import { useEffect, useState } from 'react';
import { api } from '../api';

export const useFetchTodos = (shouldRefresh?: boolean) => {
  const [state, setState] = useState<TodoProps[] | null>(null);

  useEffect(() => {
    api.todo.getTodos().then((data) => {
      setState(data);
    });
  }, [shouldRefresh]);

  return state;
};
