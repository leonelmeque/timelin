import { Pressable } from 'react-native';
import { TodoListView } from '../todo-list-view';
import { SearchViewDefault, SearchViewResultsView } from './styles';
import { useSearchTodos } from '../../store';
import { Box, Input, Spacer, Palette, Text } from '../../ui/atoms';


export const SearchView = () => {
  const { onSearch, query, onClearSearch, searchResults, numberOfResults } =
    useSearchTodos();

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
              {!numberOfResults && query && (
                <>Found {numberOfResults} results</>
              )}
              {numberOfResults && query && (
                <>Showing {numberOfResults} results</>
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
      <TodoListView showDescription showStatus data={searchResults} />
    </>
  );
};
