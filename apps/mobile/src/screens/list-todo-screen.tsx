import { useNavigation } from '@react-navigation/native';
import { Box, Header, Spacer, Text } from '@todo/mobile-ui';
import { FC } from 'react';
import { Pressable } from 'react-native';
import { CustomSafeAreaView } from '../components/safe-area-view';
import { StatusList } from '../components/status-list';
import { TodoListView } from '../components/todo-list-view';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { filterTodosByStatus, todoFilterState } from '@todo/recoil-store';
import { useRecoilState, useRecoilValue } from 'recoil';

const BackButton = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const ListTodoScreen: FC = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useRecoilState(todoFilterState);
  const filteredData = useRecoilValue(filterTodosByStatus);

  return (
    <CustomSafeAreaView>
      <Header
        renderLeftContent={() => (
          <Pressable onPress={() => navigation.goBack()}>
            <BackButton>
              <MaterialIcons name="arrow-back" size={24} />
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
          activeStatus={status as string}
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
