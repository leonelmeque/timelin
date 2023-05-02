import { Section, SectionContent, SectionHeader } from './styles';
import { withOptionsModal } from '../with-options-modal';
import { usePinnedTodo, useUpdateTodos } from '../../store';
import { Spacer, Text } from '../../ui/atoms';
import { TodoCard } from '../../ui/organisms';


const TodoCardEnhanced = withOptionsModal(TodoCard);

export const PinnedTodo = () => {
  const { pinnedTodo } = usePinnedTodo();
  const { todos } = useUpdateTodos();

  const pinned = todos.find((todo) => todo.id === pinnedTodo);

  return (
    <Section accessibilityLabel="Pinned">
      <SectionHeader>
        <Text size="body" weight="medium">
          Pinned
        </Text>
      </SectionHeader>
      <Spacer size="4" />
      <SectionContent>
        {!pinned ? (
          <Text size="small">You can pin projects for easy access</Text>
        ) : (
          <TodoCardEnhanced {...pinned} showDescription badgeType="colored" />
        )}
      </SectionContent>
    </Section>
  );
};
