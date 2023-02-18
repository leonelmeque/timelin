import db from '../db/todos.json';
import { writeToDB } from '../utils/writedb';

export const getTodos = () => db;

export const getTodoById = (id: string) => {
  if (!db.todos.length) return;

  const todo = db.todos.find((todo) => todo.id === id);

  if (!todo) throw new Error('Todo was not found');

  return todo;
};

export const updateTodos = (id: string, payload: any) => {
  if (!db.todos.length) return;

  const index = db.todos.findIndex((todo) => todo.id === id);
  db.todos[index] = payload;
  const temp = db;

  writeToDB('todos', JSON.stringify(temp));
};

export const saveTodo = (payload: any) => {
  db.todos.push(payload);
  const temp = db;

  writeToDB('todos', JSON.stringify(temp));
};

export const deleteTodo = (id: string) => {
  if (!db.todos.length) return;

  const temp = db.todos.filter((todo) => todo.id !== id);
  db.todos = temp;

  writeToDB('todos', JSON.stringify(db));
};
