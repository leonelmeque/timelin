import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { hooks, TodoProps } from '@todo/commons';
import { Header, Spacer, Text } from '@todo/mobile-ui';
import { FC, useState } from 'react';
import { Pressable } from 'react-native';
import Box from '../components/atoms/Layout/Layout';
import { CustomSafeAreaView } from '../components/safe-area-view';
import { StatusList } from '../components/status-list';
import { TodoListView } from '../components/todo-list-view';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import styled from 'styled-components/native';

type ListTodoScreenProps = {
  Params: {
    todos: TodoProps[] | null;
  };
};

const BackButton = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const ListTodoScreen: FC = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState('ongoing');
  const {
    params: { todos },
  } = useRoute<RouteProp<ListTodoScreenProps>>();

  const filteredData = hooks.useFilterByStatus(status, todos || []);

  return (
    <CustomSafeAreaView>
      <Header
        renderLeftContent={() => (
          <Pressable onPress={() => navigation.goBack()}>
            <BackButton>
              <ArrowLeft />
              <Spacer size="4" />
              <Text size="body">Back</Text>
            </BackButton>
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
