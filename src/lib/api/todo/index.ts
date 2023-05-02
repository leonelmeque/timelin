import { createTodo } from './create-todo';
import { deleteTodo } from './delete-todo';
import { getTodo } from './get-todo';
import { getTodos } from './get-todos';
import { updateTodo } from './update-todo';
import { addPinnedTodo } from './add-pinned-todo';
import { removePinnedTodo } from './remove-pinned-todo';
import { getPinnedTodo } from './get-pinned-todo';

export const todo = {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
  addPinnedTodo,
  removePinnedTodo,
  getPinnedTodo
};
