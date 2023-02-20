import db from '../db/todos.json';
import { Todo, TodoStatus } from '../types';
import { generateId } from '../utils/generateID';
import { writeToDB } from '../utils/writedb';

export const getTodos = () => db;

export const getTodoById = (id: string) => {
  if (!db.todos.length) return;

  const todo = db.todos.find((todo) => todo.id === id);

  if (!todo) throw new Error('Todo was not found');

  return todo;
};

export const getAllTodosById = (id: string[]) => {
  if (!db.todos.length) return;

  const temp: Todo[] = [];

  for (let uid of id) {
    const todo = db.todos.find((todo) => todo.id === uid);

    if (todo) {
      temp.push({
        ...todo,
        status: todo.status as TodoStatus,
      });
    }
  }

  return temp;
};

export const updateTodos = (id: string, payload: Todo) => {
  if (!db.todos.length) return;

  const index = db.todos.findIndex((todo) => todo.id === id);
  db.todos[index] = {
    ...db.todos[index],
    ...payload,
  };
  const temp = db;

  writeToDB('todos', JSON.stringify(temp));

  return db.todos[index];
};

export const saveTodo = (payload: Todo) => {
  const { id, ...rest } = payload;

  db.todos.push({
    id: generateId(),
    ...rest,
  });

  const temp = db;

  writeToDB('todos', JSON.stringify(temp));
};

export const deleteTodo = (id: string) => {
  if (!db.todos.length) return;

  const temp = db.todos.filter((todo) => todo.id !== id);
  db.todos = temp;

  writeToDB('todos', JSON.stringify(db));
};
