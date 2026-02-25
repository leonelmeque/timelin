import { useRouter } from 'expo-router';
import { FC } from 'react';
import { Pressable } from 'react-native';
import { CustomSafeAreaView } from '../components/safe-area-view';
import { StatusList } from '../components/status-list';
import { TodoListView } from '../components/todo-list-view';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../ui/organisms';
import { useFilterTodosStatus } from '../store';
import { Box, Spacer, Text } from '../ui/atoms';

const BackButton = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const ListTodoScreen: FC = () => {
  const router = useRouter();
  const { filteredData, status, setStatus } = useFilterTodosStatus();

  return (
    <CustomSafeAreaView>
      <Header
        renderLeftContent={() => (
          <Pressable onPress={() => router.back()}>
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
            setStatus(name as any);
          }}
        />
      </Box>

      <TodoListView
        showDescription
        showStatus
        data={filteredData}
      />
    </CustomSafeAreaView>
  );
};

ListTodoScreen.displayName = 'ListTodoScreen';
