import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { todosState } from '../todos/todos.store';
import { api } from "../../lib";

export const useFetchTodos = () => {
  const [state, setTodoState] = useAtom(todosState);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.todo.getTodos();
        setTodoState(data);
      } catch (err) {
        console.log(err)
      }
    })()
  }, []);

  return state;
};
