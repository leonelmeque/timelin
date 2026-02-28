import { useCallback, useEffect } from 'react';
import { useTodosStore } from '../todos/todos.store';

export const useFetchTodo = (id: string) => {
  const cached = useTodosStore((s) => s.todoCache[id]);
  const fetchTodo = useTodosStore((s) => s.fetchTodo);
  const clearTodoCache = useTodosStore((s) => s.clearTodoCache);

  useEffect(() => {
    fetchTodo(id);
  }, [id]);

  const resetCacheData = useCallback(() => {
    clearTodoCache(id);
  }, [id]);

  const state = cached ?? { state: 'loading' as const };

  return {
    value: [state],
    resetCacheData,
  };
};
