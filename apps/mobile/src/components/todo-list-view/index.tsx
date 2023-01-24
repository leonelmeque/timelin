import { TodoProps } from '@todo/commons';
import { Spacer, TodoCard } from '@todo/mobile-ui';
import { FC, useCallback } from 'react';
import { View } from 'react-native';
import { TodoList } from './styles';

type TodoListViewProps = {
  data: TodoProps[] | null | undefined;
  showStatus?: boolean;
  showDescription?: boolean;
  horizontal?: boolean;
};

export const TodoListView: FC<TodoListViewProps> = ({
  data,
  showStatus,
  showDescription,
  horizontal,
}) => {
  const _renderItem = useCallback(
    ({ item }: any) => (
      <View
        style={{
          flex: 1,
          minWidth: 200,
        }}
      >
        <TodoCard
          showStatus={showStatus}
          showDescription={showDescription}
          {...item}
        />
      </View>
    ),
    [data]
  );

  return (
    <TodoList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={horizontal}
      data={data}
      keyExtractor={(item: any) => item.id.toString()}
      ItemSeparatorComponent={() => <Spacer size="8" />}
      renderItem={_renderItem}
    />
  );
};
