import { useEffect, useState } from 'react';
import { TodoProps } from '../shared-types';

export const useSearchTodos = (data: TodoProps[] | null) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<
    TodoProps[] | undefined | null
  >(null);

  const findTodos = () => {
    const _data = data?.filter(
      (item) =>
        item.todo.toLocaleLowerCase().indexOf(query.toLowerCase()) > -1 ||
        item.description.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
    setSearchResults(_data);
  };

  const onSearch = (value: string) => {
    setQuery(value);
  };

  const onClearSearch = () => {
    setQuery('');
  };

  useEffect(() => {
    if (query) findTodos();
    else if (!query) setSearchResults([]);
  }, [query]);

  return {
    query,
    onSearch,
    onClearSearch,
    searchResults,
  };
};
