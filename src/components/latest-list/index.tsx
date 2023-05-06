import React from 'react'
import { Section, SectionContent, SectionHeader } from './styles';
import { withOptionsModal } from '../with-options-modal';
import { useLatest, useUpdateTodos } from '../../store';
import { Spacer, Text } from '../../ui/atoms';
import { TodoCard } from '../../ui/organisms';


const TodoCardEnhanced = withOptionsModal(TodoCard);

export const LatestList = () => {
  const { latestChanged } = useLatest();
  const { todos } = useUpdateTodos();

  const pinned = todos.find((todo) => todo.id === latestChanged);

  return (
    <Section accessibilityLabel="Latest">
      <SectionHeader>
        <Text size="body" weight="medium">
          Latetst
        </Text>
      </SectionHeader>
      <Spacer size="4" />
      <SectionContent>
        {!pinned ? (
          <Text size="small">There's no recent updated todo's</Text>
        ) : (
          <TodoCardEnhanced {...pinned} badgeType="colored" />
        )}
      </SectionContent>
    </Section>
  );
};
