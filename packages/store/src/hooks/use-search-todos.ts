import { useAtomValue } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { filterTodosByQuery, todosState } from '../todos/todos.store';

export const useSearchTodos = () => {
  const [query, setQuery] = useState('');
  const currentTodosState = useAtomValue(todosState)
  const todos = useAtomValue(useMemo(() => filterTodosByQuery(query), [query, currentTodosState]));

  const onSearch = (value: string) => {
    setQuery(value);
  };

  const onClearSearch = () => {
    setQuery('');
  };

  return {
    query,
    onSearch,
    onClearSearch,
    searchResults: todos,
    numberOfResults: todos?.length,
  };
};
