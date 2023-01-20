import { TodoProps } from '@todo/commons';
import { Button, Spacer, Text, TodoCard } from '@todo/mobile-ui';
import { FC, useCallback } from 'react';
import Box from '../atoms/Layout/Layout';
import { TodoList } from './styles';

type TodoListViewProps = {
  data: TodoProps[] | null | undefined;
};

export const TodoListView: FC<TodoListViewProps> = ({ data }) => {
  const _renderItem = useCallback(
    ({ item }: any) => <TodoCard {...item} />,
    []
  );

  if (!data) {
    <Box>
      <Text size="large">Looks like your list is empty</Text>
      <Button label="Add a TODO" variant="primary" size="md" />
    </Box>;
  }

  return (
    <TodoList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item: any) => item.id.toString()}
      ItemSeparatorComponent={() => <Spacer size="16" />}
      renderItem={_renderItem}
    />
  );
};
