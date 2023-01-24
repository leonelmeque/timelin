import Box from '../components/atoms/Layout/Layout';
import useFetchTodos from '../hooks/use-fetch-todos';
import {
  SearchHeader,
  Spacer,
  Header,
  Text,
  Avatar,
  Palette,
} from '@todo/mobile-ui';
import { TodoListView } from '../components/todo-list-view';

import { CustomSafeAreaView } from '../components/safe-area-view';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { tokens } from '@todo/commons';

export default function TodosScreen() {
  const todos = useFetchTodos();
  const navigation = useNavigation();

  const renderRigthContent = () => (
    <Pressable
      onPress={() => navigation.navigate<string>('Todo/Search', { todos })}
    >
      <Text size="body">Search</Text>
    </Pressable>
  );

  const renderLeftContent = () => (
    <Avatar
      size={tokens.spacing.size48}
      radius={tokens.spacing.size8}
      source={{
        uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80',
      }}
    />
  );

  const navigateToSearch = () =>
    navigation.navigate<string>('Todo/Search', { todos });

  return (
    <CustomSafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}
    >
      <Header
        renderLeftContent={renderLeftContent}
        renderRigthContent={renderRigthContent}
      />

      <Spacer size="8" />
      <Box
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text size="body" weight="medium">
          Projects
        </Text>
        <Pressable onPress={navigateToSearch}>
          <Text size="small" weight="medium" colour={Palette.primary.P300}>
            More
          </Text>
        </Pressable>
      </Box>
      <Spacer size="4" />

      {!todos && (
        <Box
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text size="body">Looks like you don't have any projects</Text>
        </Box>
      )}
      {todos && <TodoListView horizontal data={todos} />}
    </CustomSafeAreaView>
  );
}
