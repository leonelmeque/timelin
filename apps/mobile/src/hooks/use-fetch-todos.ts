import { TodoProps } from '@todo/commons';
import { useEffect, useState } from 'react';
import { todosAPI } from '../utils/backend';

const useFetchTodos = (shouldRefresh?: boolean) => {
  const [state, setState] = useState<TodoProps[] | null>(null);

  useEffect(() => {
    todosAPI.getTodos().then((data) => {
      setState(data);
    });
  }, [shouldRefresh]);

  return state;
};

export default useFetchTodos;
