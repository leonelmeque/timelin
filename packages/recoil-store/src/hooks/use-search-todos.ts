import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { filterTodosByQuery } from '../selectors/todos/filter-todos-by-query.selector';
import { TodoProps } from '@todo/commons';

export const useSearchTodos = () => {
  const [query, setQuery] = useState('');
  const todos = useRecoilValue(filterTodosByQuery({ query }));

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
    numberOfResults: todos.length,
  };
};
