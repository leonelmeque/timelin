import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { TodoProps, TodoStatus } from '../../lib/shared-types';
import { api } from '../../lib/api';

export const todosState = atom<TodoProps[]>([]);
export const currentTodoIdAtom = atom<string>('');
export const pinnedTodo = atom<string | null>(null);
export const todoFilterState = atom<TodoStatus>(TodoStatus.ON_GOING);

export const readWriteTodosAtom = atom(
  (get) => get(todosState),
  (get, set, update: TodoProps) => {
    const newTodos = get(todosState);
    newTodos.push(update);
    set(todosState, newTodos);
  }
);

export const removeExistingFromTodoAtom = atom(null, (get, set, id: string) => {
  const newTodos = get(todosState);
  const index = newTodos.findIndex((item) => item.id === id);
  newTodos.splice(index, 1);
  set(todosState, newTodos);
});

export const readWriteFilterState = atom(
  (get) => get(todoFilterState),
  (get, set, newStatus: TodoStatus) => {
    set(todoFilterState, newStatus);
  }
);

export const getAsyncTodo = atomFamily((id: string) =>
  atom(async (get) => {
    return await api.todo.getTodo(id);
  })
);

export const filterTodosByStatus = atom<TodoProps[]>((get) => {
  const list = get(todosState);
  const filter = get(readWriteFilterState);

  function filteredData() {
    switch (filter) {
      case TodoStatus.ON_GOING:
        return list.filter((item) => item.status === TodoStatus.ON_GOING);
      case TodoStatus.COMPLETED:
        return list.filter((item) => item.status === TodoStatus.COMPLETED);
      case TodoStatus.TODO:
        return list.filter((item) => item.status === TodoStatus.TODO);
      case TodoStatus.ON_HOLD:
        return list.filter((item) => item.status === TodoStatus.ON_HOLD);
      default:
        return [];
    }
  }

  return filteredData();
});

export const filterTodosByQuery = (param: string) =>
  atom<TodoProps[]>((get) => {
    const list = get(readWriteTodosAtom);

    if (!param) return [];

    return list.filter(
      (item: TodoProps) =>
        item.todo.toLocaleLowerCase().indexOf(param.toLowerCase()) > -1 ||
        item.description.toLowerCase().indexOf(param.toLowerCase()) > -1
    );
  });

export const readWritePinnedTodo = atom(
  (get) => {
    return get(pinnedTodo);
  },
  (get, set, update: string) => {
    set(pinnedTodo, update);
  }
);
