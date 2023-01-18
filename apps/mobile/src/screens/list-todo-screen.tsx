import { useCallback } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Box from '../components/atoms/Layout/Layout';
import { Header } from '../components';
import useFetchTodos from '../hooks/use-fetch-todos';
import { SearchHeader, Spacer, TodoCard } from '@todo/mobile-ui';

export const TodoList = styled(FlatList)`
  flex: 1;
  height: 100px;
  padding: ${({ theme: { spacing } }) =>
    `${spacing.size16}px ${spacing.size16}px ${spacing.size64}px`};
`;

export default function TodosScreen() {
  const todos = useFetchTodos();

  const _renderItem = useCallback(
    ({ item }: any) => <TodoCard {...item} />,
    []
  );

  return (
    <SafeAreaView
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
          onPress={() => alert('Feature not ready yet')}
        />
      </Box>
      <Spacer size="4" />
      <TodoList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={todos}
        keyExtractor={(item: any) => item.id.toString()}
        ItemSeparatorComponent={() => <Spacer size="16" />}
        renderItem={_renderItem}
      />
    </SafeAreaView>
  );
}
