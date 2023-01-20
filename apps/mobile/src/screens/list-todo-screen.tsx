import Box from '../components/atoms/Layout/Layout';
import useFetchTodos from '../hooks/use-fetch-todos';
import { SearchHeader, Spacer, Header } from '@todo/mobile-ui';
import { TodoListView } from '../components/todo-list-view';

import { CustomSafeAreaView } from '../components/safe-area-view';
import { useNavigation } from '@react-navigation/native';

export default function TodosScreen() {
  const todos = useFetchTodos();
  const navigation = useNavigation();
  return (
    <CustomSafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}
    >
      <Header />
      <Spacer size="8" />
      <Box>
        <SearchHeader
          title="Your tasks"
          onPress={() => navigation.navigate<string>('Todo/Search', { todos })}
        />
      </Box>
      <Spacer size="4" />
      <TodoListView data={todos} />
    </CustomSafeAreaView>
  );
}
