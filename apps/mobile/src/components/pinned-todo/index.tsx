import { Spacer, Text, TodoCard } from '@todo/mobile-ui';
import { Section, SectionContent, SectionHeader } from './styles';
import { usePinnedTodo, useUpdateTodos } from '@todo/store';
import { withOptionsModal } from '../with-options-modal';

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
