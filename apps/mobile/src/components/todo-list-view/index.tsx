import { useNavigation } from '@react-navigation/native';
import { TodoProps } from '@todo/commons';
import { Spacer, TodoCard } from '@todo/mobile-ui';
import { FC, useCallback } from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
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
  const navigation = useNavigation();
  const onPressTodoCard = (todo: TodoProps) => (e: GestureResponderEvent) => {
    navigation.navigate<string>('Todo/View', { todo });
  };
  const _renderItem = useCallback(
    ({ item }: any) => (
      <Pressable
        style={{
          flex: 1,
          minWidth: 200,
        }}
        onPress={onPressTodoCard(item)}
      >
        <TodoCard
          showStatus={showStatus}
          showDescription={showDescription}
          {...item}
        />
      </Pressable>
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
