import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import {
  filterTodosByStatus,
  todoFilterState,
  todosState,
} from '../todos/todos.store';

export const useFilterTodosStatus = () => {
  const [status, setStatus] = useAtom(todoFilterState);
  const filteredData = useAtomValue(filterTodosByStatus);

  return {
    status,
    setStatus,
    filteredData,
  };
};
