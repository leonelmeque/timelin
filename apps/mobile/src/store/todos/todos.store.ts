import { create } from 'zustand';
import { TodoProps, TodoStatus } from '../../lib/shared-types';
import { api } from '../../lib/api';

type TodosState = {
  todos: TodoProps[];
  filter: TodoStatus;
  pinnedTodoId: string | null;
  latestChangedId: string | null;
  todoCache: Record<string, { state: 'loading' | 'hasData' | 'hasError'; data?: any }>;

  fetchTodos: () => Promise<void>;
  addTodo: (todo: TodoProps) => void;
  deleteTodo: (id: string) => void;
  syncTodo: (id: string, update: TodoProps) => void;

  setFilter: (status: TodoStatus) => void;
  getFilteredTodos: () => TodoProps[];

  fetchPinnedTodo: () => Promise<void>;
  setPinnedTodo: (id: string) => void;
  removePinnedTodo: () => void;

  fetchLatestChanged: () => Promise<void>;
  setLatestChanged: (id: string) => void;

  fetchTodo: (id: string) => Promise<void>;
  clearTodoCache: (id: string) => void;

  searchTodos: (query: string) => TodoProps[];
};

export const useTodosStore = create<TodosState>((set, get) => ({
  todos: [],
  filter: TodoStatus.ON_GOING,
  pinnedTodoId: null,
  latestChangedId: null,
  todoCache: {},

  fetchTodos: async () => {
    try {
      const data = await api.todo.getTodos();
      set({ todos: data });
    } catch (err) {
      console.log(err);
    }
  },

  addTodo: (todo) => {
    set((state) => ({ todos: state.todos.concat(todo) }));
  },

  deleteTodo: (id) => {
    set((state) => ({ todos: state.todos.filter((item) => item.id !== id) }));
  },

  syncTodo: (id, update) => {
    set((state) => {
      const newTodos = [...state.todos];
      const index = newTodos.findIndex((item) => item.id === id);
      newTodos[index] = update;
      return { todos: newTodos };
    });
  },

  setFilter: (status) => {
    set({ filter: status });
  },

  getFilteredTodos: () => {
    const { todos, filter } = get();
    switch (filter) {
      case TodoStatus.ON_GOING:
        return todos.filter((item) => item.status === TodoStatus.ON_GOING);
      case TodoStatus.COMPLETED:
        return todos.filter((item) => item.status === TodoStatus.COMPLETED);
      case TodoStatus.TODO:
        return todos.filter((item) => item.status === TodoStatus.TODO);
      case TodoStatus.ON_HOLD:
        return todos.filter((item) => item.status === TodoStatus.ON_HOLD);
      default:
        return [];
    }
  },

  fetchPinnedTodo: async () => {
    try {
      const { pinned: pinnedTodo = null } =
        (await api.todo.getPinnedTodo()) ||
        ({} as { pinned: string });

      if (!pinnedTodo) {
        return;
      }
      set({ pinnedTodoId: pinnedTodo });
    } catch (err) {
      console.error('Could not find a pinned todo');
    }
  },

  setPinnedTodo: (id) => {
    set({ pinnedTodoId: id });
  },

  removePinnedTodo: () => {
    set({ pinnedTodoId: '' });
  },

  fetchLatestChanged: async () => {
    try {
      const data = (await api.todo.getLastestChanged()) as {
        latestChanged: string;
      };

      if (data?.latestChanged) {
        set({ latestChangedId: data.latestChanged });
      }
    } catch (err) {
      console.error('Could not find latest changed');
    }
  },

  setLatestChanged: (id) => {
    set({ latestChangedId: id });
  },

  fetchTodo: async (id) => {
    set((state) => ({
      todoCache: { ...state.todoCache, [id]: { state: 'loading' } },
    }));
    try {
      const data = await api.todo.getTodo(id);
      set((state) => ({
        todoCache: { ...state.todoCache, [id]: { state: 'hasData', data } },
      }));
    } catch (err) {
      set((state) => ({
        todoCache: { ...state.todoCache, [id]: { state: 'hasError' } },
      }));
    }
  },

  clearTodoCache: (id) => {
    set((state) => {
      const newCache = { ...state.todoCache };
      delete newCache[id];
      return { todoCache: newCache };
    });
  },

  searchTodos: (query) => {
    const { todos } = get();
    if (!query) return [];
    return todos.filter(
      (item: TodoProps) =>
        item.todo.toLocaleLowerCase().indexOf(query.toLowerCase()) > -1 ||
        item.description.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  },
}));
