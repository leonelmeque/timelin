import { useEffect } from 'react';
import { useTodosStore } from '../todos/todos.store';

export const useLatest = () => {
  const latestChanged = useTodosStore((s) => s.latestChangedId);
  const setLatestChanged = useTodosStore((s) => s.setLatestChanged);
  const fetchLatestChanged = useTodosStore((s) => s.fetchLatestChanged);

  const updateLatestChanged = (id: string) => {
    setLatestChanged(id);
  };

  useEffect(() => {
    fetchLatestChanged();
  }, []);

  return {
    latestChanged,
    updateLatestChanged,
  };
};
