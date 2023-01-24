import { hooks, TodoProps } from '@todo/commons';
import { Input, Palette, Spacer, Text } from '@todo/mobile-ui';
import { Pressable } from 'react-native';
import Box from '../atoms/Layout/Layout';
import { TodoListView } from '../todo-list-view';
import { SearchViewDefault, SearchViewResultsView } from './styles';

export const SearchView = ({ data }: { data: TodoProps[] | null }) => {
  const { onSearch, query, onClearSearch, searchResults } =
    hooks.useSearchTodos(data);
  return (
    <>
      <Box>
        <Input
          placeholder="Type something awesome..."
          onChangeText={onSearch}
          value={query}
        />
      </Box>
      <Spacer size="8" />
      {!query && (
        <SearchViewDefault>
          <Text size="large" weight="bold">
            Nothing to Display
          </Text>
        </SearchViewDefault>
      )}
      {query && (
        <>
          <SearchViewResultsView
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 0,
            }}
          >
            <Text size="body" weight="medium" colour={Palette.greys.G100}>
              {searchResults?.length === 0 && query && (
                <>Found {searchResults?.length} results</>
              )}
              {searchResults?.length !== 0 && query && (
                <>Showing {searchResults?.length} results</>
              )}
            </Text>
            <Pressable onPress={onClearSearch}>
              <Text size="body" weight="medium" colour={Palette.primary.P300}>
                Clear
              </Text>
            </Pressable>
          </SearchViewResultsView>
          <Spacer size="8" />
        </>
      )}
      <TodoListView showDescription showStatus data={searchResults || []} />
    </>
  );
};
