import React from "react"
import { Section, SectionContent, SectionHeader } from './styles';
import { withOptionsModal } from '../with-options-modal';
import { usePinnedTodo, useUpdateTodos } from '../../store';
import { Spacer, Text } from '../../ui/atoms';
import { TodoCard } from '../../ui/organisms';
import { useTranslation } from "react-i18next";

const TodoCardEnhanced = withOptionsModal(TodoCard);

export const PinnedTodo = () => {
  const { t } = useTranslation()
  const { pinnedTodo } = usePinnedTodo();
  const { todos } = useUpdateTodos();

  const pinned = todos.find((todo) => todo.id === pinnedTodo);

  return (
    <Section accessibilityLabel="Pinned">
      <SectionHeader>
        <Text size="body" weight="medium">
          {t("home.pinned_todo.heading")}
        </Text>
      </SectionHeader>
      <Spacer size="4" />
      <SectionContent>
        {!pinned ? (
          <Text size="small">{t("home.pinned_todo.empty_state")}</Text>
        ) : (
            <TodoCardEnhanced {...pinned} badgeType="colored" />
        )}
      </SectionContent>
    </Section>
  );
};
