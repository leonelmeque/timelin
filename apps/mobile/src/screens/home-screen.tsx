import Box from '../components/atoms/Layout/Layout';
import useFetchTodos from '../hooks/use-fetch-todos';
import { Spacer, Header, Text, Avatar, Palette } from '@todo/mobile-ui';
import { TodoListView } from '../components/todo-list-view';
import { CustomSafeAreaView } from '../components/safe-area-view';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Keyboard, Pressable } from 'react-native';
import { tokens } from '@todo/commons';
import { AddTodoModalView } from '../components/add-todo-modal-view';
import { useCustomModal } from '../context';
import { useCallback, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
export default function HomeScreen() {
  const navigation = useNavigation();
  const [modalVisibility, setModalVisibility] = useCustomModal();
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const todos = useFetchTodos(shouldRefresh);

  const renderRigthContent = () => (
    <Pressable
      //@ts-ignore
      onPress={() => navigation.navigate<string>('Todo/Search', { todos })}
    >
      <MaterialIcons name="search" size={24} />
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

  const nagivateToTodoList = () =>
    //@ts-ignore
    navigation.navigate<string>('Todo/ListTodo', { todos });

  const onModalDismiss = () => {
    Keyboard.dismiss();
    setModalVisibility(!modalVisibility);
  };

  useFocusEffect(
    useCallback(() => {
      setShouldRefresh(true);
      return () => {
        setShouldRefresh(false);
      };
    }, [])
  );

  return (
    <CustomSafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}
    >
      <AddTodoModalView
        key={todos?.length}
        visibility={modalVisibility}
        onModalDismiss={onModalDismiss}
      />
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
        <Pressable onPress={nagivateToTodoList}>
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

HomeScreen.displayName = 'HomeScreen';
