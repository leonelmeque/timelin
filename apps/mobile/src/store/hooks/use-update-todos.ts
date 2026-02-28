import { useTodosStore } from '../todos/todos.store';
import { TodoProps } from '../../lib/shared-types';

export const useUpdateTodos = () => {
  const todos = useTodosStore((s) => s.todos);
  const addTodo = useTodosStore((s) => s.addTodo);
  const deleteTodo = useTodosStore((s) => s.deleteTodo);
  const syncTodo = useTodosStore((s) => s.syncTodo);

  const handleAddTodoAtom = (todo: TodoProps) => {
    addTodo(todo);
  };

  const handleDeleteTodoAtom = (id: string) => {
    deleteTodo(id);
  };

  const handleSyncTodoAtom = (id: string, update: TodoProps) => {
    syncTodo(id, update);
  };

  return {
    todos,
    handleAddTodoAtom,
    handleSyncTodoAtom,
    handleDeleteTodoAtom,
  };
};
