import { useEffect } from 'react';
import { api } from '../api';
import { TodoProps } from '../shared-types';

export const useUpdateTodo = (todo: TodoProps) => {
  useEffect(() => {
    const controller = new AbortController();

    setTimeout(() => {
      api.todo
        .updateTodo(todo.id, todo, controller.signal)
        .then((res) => {})
        .catch(() => {
          if (controller.signal.aborted) {
            console.log('The user aborted the request');
          }
        });
    }, 500);

    return () => {
      controller.abort();
    };
  }, [todo]);
};
