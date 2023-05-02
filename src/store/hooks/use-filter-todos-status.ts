import { useAtom, useAtomValue } from 'jotai';
import {
  filterTodosByStatus,
  todoFilterState,
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
