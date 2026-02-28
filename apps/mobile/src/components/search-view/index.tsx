import { Pressable } from 'react-native';
import { TodoListView } from '../todo-list-view';
import { SearchViewDefault, SearchViewResultsView } from './styles';
import { useSearchTodos } from '../../store';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/cn';


export const SearchView = () => {
  const { onSearch, query, onClearSearch, searchResults, numberOfResults } =
    useSearchTodos();

  return (
    <>
      <View className={cn("px-4")}>
        <Input
          placeholder="Type something awesome..."
          onChangeText={onSearch}
          value={query}
        />
      </View>
      <View className="h-4" />
      {!query && (
        <SearchViewDefault>
          <Text className="text-lg font-bold">
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
            <Text className="font-medium text-grey-100">
              {!numberOfResults && query && (
                <>Found {numberOfResults} results</>
              )}
              {numberOfResults && query && (
                <>Showing {numberOfResults} results</>
              )}
            </Text>
            <Pressable onPress={onClearSearch}>
              <Text className="font-medium text-primary-300">
                Clear
              </Text>
            </Pressable>
          </SearchViewResultsView>
          <View className="h-4" />
        </>
      )}
      <TodoListView showDescription showStatus data={searchResults} />
    </>
  );
};
