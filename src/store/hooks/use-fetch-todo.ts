import { useAtom } from 'jotai';
import { loadable } from 'jotai/utils';
import { useCallback } from 'react';
import { getAsyncTodo } from '../todos/todos.store';

export const useFetchTodo = (id: string) => {
  const value = useAtom(loadable(getAsyncTodo(id)));

  const resetCacheData = useCallback(() => {
    getAsyncTodo.setShouldRemove(() => true);
    getAsyncTodo.setShouldRemove(null);
  }, [id]);

  return {
    value,
    resetCacheData,
  };
};
