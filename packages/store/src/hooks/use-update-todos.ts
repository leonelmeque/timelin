import { TodoProps } from '@todo/commons';
import { useAtom } from 'jotai';
import { todosState } from '../todos/todos.store';

export const useUpdateTodos = () => {
  const [_, setTodos] = useAtom(todosState);

  const handleAddTodoAtom = (todo: TodoProps) => {
    setTodos((prev) => prev.concat(todo));
  }

  const handleDeleteTodoAtom = (id: string) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSyncTodoAtom = (id: string, update: TodoProps) => {
    setTodos((prev) => {
      const newTodos = [...prev];
      const index = newTodos.findIndex((item) => item.id === id);
      newTodos[index] = update;
      return newTodos;
    });
  };

  return {
    handleAddTodoAtom,
    handleSyncTodoAtom,
    handleDeleteTodoAtom,
  };
};
