import { useMemo, useState } from 'react';
import { useTodosStore } from '../todos/todos.store';

export const useSearchTodos = () => {
  const [query, setQuery] = useState('');
  const todos = useTodosStore((s) => s.todos);

  const searchResults = useMemo(() => {
    if (!query) return [];
    return todos.filter(
      (item) =>
        item.todo.toLocaleLowerCase().indexOf(query.toLowerCase()) > -1 ||
        item.description.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }, [todos, query]);

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
    searchResults,
    numberOfResults: searchResults?.length,
  };
};
