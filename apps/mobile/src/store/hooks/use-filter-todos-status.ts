import { useMemo } from 'react';
import { useTodosStore } from '../todos/todos.store';
import { TodoStatus } from '../../lib/shared-types';

export const useFilterTodosStatus = () => {
  const todos = useTodosStore((s) => s.todos);
  const status = useTodosStore((s) => s.filter);
  const setStatus = useTodosStore((s) => s.setFilter);

  const filteredData = useMemo(() => {
    switch (status) {
      case TodoStatus.ON_GOING:
        return todos.filter((item) => item.status === TodoStatus.ON_GOING);
      case TodoStatus.COMPLETED:
        return todos.filter((item) => item.status === TodoStatus.COMPLETED);
      case TodoStatus.TODO:
        return todos.filter((item) => item.status === TodoStatus.TODO);
      case TodoStatus.ON_HOLD:
        return todos.filter((item) => item.status === TodoStatus.ON_HOLD);
      default:
        return [];
    }
  }, [todos, status]);

  return {
    status,
    setStatus,
    filteredData,
  };
};
