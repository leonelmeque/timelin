import { useEffect } from 'react';
import { useTodosStore } from '../todos/todos.store';

export const useFetchTodos = () => {
  const todos = useTodosStore((s) => s.todos);
  const fetchTodos = useTodosStore((s) => s.fetchTodos);

  useEffect(() => {
    fetchTodos();
  }, []);

  return todos;
};
