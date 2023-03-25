import { atom } from 'recoil';
import { TodoProps, TodoStatus } from '@todo/commons';

export const todosState = atom<TodoProps[]>({
  key: 'todos',
  default: [],
});

export const todoFilterState = atom<TodoStatus>({
  key: 'todoFilterState',
  default: TodoStatus.ON_GOING,
});
