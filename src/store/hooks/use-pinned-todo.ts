import { useAtom } from 'jotai';
import { readWritePinnedTodo } from '../todos/todos.store';
import { useEffect } from 'react';
import { api } from '../../lib/api';

export const usePinnedTodo = () => {
  const [pinned, setPinned] = useAtom(readWritePinnedTodo);

  const addOrUpdatePinnedTodo = (id: string) => {
    setPinned(id);
  };

  const removePinnedTodo = () => {
    setPinned('');
  };

  useEffect(() => {
    const fetchPinnedTodo = async () => {
      try {
        const { pinned: pinnedTodo } = (await api.todo.getPinnedTodo()) as {
          pinned: string;
        };
        if (!pinnedTodo) {
          return;
        }

        setPinned(pinnedTodo);
      } catch (err) {
        console.error('Could not find a pinned todo');
      }
    };

    fetchPinnedTodo();
  }, []);

  return {
    pinnedTodo: pinned,
    addOrUpdatePinnedTodo,
    removePinnedTodo,
  };
};
