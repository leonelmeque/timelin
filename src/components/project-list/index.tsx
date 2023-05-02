import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { TodoListView } from '../todo-list-view';
import { Section, SectionHeader, SectionContent } from './style';
import { useFetchTodos } from '../../store';
import { Palette, Spacer, Box, Text } from '../../ui/atoms';

export const ProjectList = () => {
  const navigation = useNavigation();
  const [todos] = useFetchTodos();

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
          {!todos.length && (
            <Text size="small">Looks like you don't have any projects</Text>
          )}
        </Box>
        {todos && <TodoListView horizontal data={todos} />}
      </SectionContent>
    </Section>
  );
};
