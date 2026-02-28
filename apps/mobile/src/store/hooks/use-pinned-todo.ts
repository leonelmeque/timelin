import { useEffect } from 'react';
import { useTodosStore } from '../todos/todos.store';

export const usePinnedTodo = () => {
  const pinned = useTodosStore((s) => s.pinnedTodoId);
  const setPinnedTodo = useTodosStore((s) => s.setPinnedTodo);
  const removePinnedTodo = useTodosStore((s) => s.removePinnedTodo);
  const fetchPinnedTodo = useTodosStore((s) => s.fetchPinnedTodo);

  const addOrUpdatePinnedTodo = (id: string) => {
    setPinnedTodo(id);
  };

  useEffect(() => {
    fetchPinnedTodo();
  }, []);

  return {
    pinnedTodo: pinned,
    addOrUpdatePinnedTodo,
    removePinnedTodo,
  };
};
