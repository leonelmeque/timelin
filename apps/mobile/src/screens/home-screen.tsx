import { Spacer, Header, Text, Avatar, Palette, Box } from '@todo/mobile-ui';
import { TodoListView } from '../components/todo-list-view';
import { CustomSafeAreaView } from '../components/safe-area-view';
import { useNavigation } from '@react-navigation/native';
import { Keyboard, Pressable } from 'react-native';
import { hooks, tokens } from '@todo/commons';
import { AddTodoModalView } from '../components/add-todo-modal-view';
import { useCustomModal, useUserContext } from '../context';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

const SafeArea = styled(CustomSafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

const SectionHeader = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  padding: 0px;
`;

const SectionContent = styled.View`
  padding: 0px;
`;

const Section = styled(Box)`
  flex: 1;
`;

export default function HomeScreen() {
  const [user] = useUserContext();
  const navigation = useNavigation();
  const [modalVisibility, setModalVisibility] = useCustomModal();
  const { todos, isLoading } = hooks.useFetchTodos(
    (user?.todos as string[]) || []
  );

  const nagivateToTodoList = () =>
    //@ts-ignore
    navigation.navigate<string>('Todo/ListTodo', { todos });

  const onModalDismiss = () => {
    Keyboard.dismiss();
    setModalVisibility(!modalVisibility);
  };

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

  if (isLoading === 'FETCHING')
    return (
      <SafeArea>
        <Box
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text size="heading">Loading data</Text>
        </Box>
      </SafeArea>
    );

  return (
    <SafeArea>
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

      <Section accessibilityLabel="Projects">
        <SectionHeader>
          <Text size="body" weight="medium">
            Projects
          </Text>
          <Pressable onPress={nagivateToTodoList}>
            <Text size="small" weight="medium" colour={Palette.primary.P300}>
              More
            </Text>
          </Pressable>
        </SectionHeader>
        <Spacer size="4" />
        <SectionContent>
          <>
            {!!todos && (
              <Text size="small">Looks like you don't have any projects</Text>
            )}
            {todos && <TodoListView horizontal data={todos} />}
          </>
        </SectionContent>
      </Section>
      <Spacer size="4" />
      <Section accessibilityLabel="Pinned">
        <SectionHeader>
          <Text size="body" weight="medium">
            Pinned
          </Text>
        </SectionHeader>
        <Spacer size="4" />
        <SectionContent>
          <>
            {!!todos && (
              <Text size="small">You can pin projects for easy access</Text>
            )}
          </>
        </SectionContent>
      </Section>
      <Spacer size="4" />
      <Section accessibilityLabel="Latest">
        <SectionHeader>
          <Text size="body" weight="medium">
            Latest
          </Text>
        </SectionHeader>
        <Spacer size="4" />
        <SectionContent>
          <>
            {!!todos && (
              <Text size="small">There are no recent projects created</Text>
            )}
          </>
        </SectionContent>
      </Section>
      <Spacer size="4" />
    </SafeArea>
  );
}

HomeScreen.displayName = 'HomeScreen';
