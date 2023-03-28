import { useNavigation } from '@react-navigation/native';
import { Palette, Spacer, Box, Text } from '@todo/mobile-ui';
import { useFetchTodos } from '@todo/store';
import { Pressable } from 'react-native';
import { useUserContext } from '../../context';
import { TodoListView } from '../todo-list-view';
import { Section, SectionHeader, SectionContent } from './style';

export const ProjectList = () => {
  const [user] = useUserContext();
  const navigation = useNavigation();
  const [todos] = useFetchTodos(user?.todos as string[]);

  const nagivateToTodoList = () => {
    //@ts-ignore
    navigation.navigate<string>('Todo/ListTodo');
  };

  if (!todos) return <Text size="body">Loading Projects</Text>;

  return (
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
        <Box>
          {!todos && (
            <Text size="small">Looks like you don't have any projects</Text>
          )}
        </Box>
        {todos && <TodoListView horizontal data={todos} />}
      </SectionContent>
    </Section>
  );
};
