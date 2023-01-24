import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { hooks, TodoProps } from '@todo/commons';
import { Header, Text } from '@todo/mobile-ui';
import { FC, useState } from 'react';
import { Pressable } from 'react-native';
import Box from '../components/atoms/Layout/Layout';
import { CustomSafeAreaView } from '../components/safe-area-view';
import { StatusList } from '../components/status-list';
import { TodoListView } from '../components/todo-list-view';

type ListTodoScreenProps = {
  Params: {
    todos: TodoProps[] | null;
  };
};

export const ListTodoScreen: FC = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState('ongoing');
  const {
    params: { todos },
  } = useRoute<RouteProp<ListTodoScreenProps>>();

  const filteredData = hooks.useFilterByStatus(status, todos || []);

  return (
    <CustomSafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <Header
        renderLeftContent={() => (
          <Pressable onPress={() => navigation.goBack()}>
            <Text size="body" weight="bold">
              Back
            </Text>
          </Pressable>
        )}
        renderRigthContent={() => (
          <Text size="body" weight="bold">
            Search
          </Text>
        )}
      />
      <Box>
        <StatusList
          activeStatus={status}
          onPress={(e, name) => {
            setStatus(name);
          }}
        />
      </Box>

      <TodoListView showDescription showStatus data={filteredData} />
    </CustomSafeAreaView>
  );
};

ListTodoScreen.displayName = 'ListTodoScreen';
