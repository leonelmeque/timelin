import React from "react"
import { Section, SectionContent, SectionHeader } from './styles';
import { withOptionsModal } from '../with-options-modal';
import { usePinnedTodo, useUpdateTodos } from '../../store';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { TodoCard } from '@/components/todo-card';
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
        <Text className="font-medium">
          {t("home.pinned_todo.heading")}
        </Text>
      </SectionHeader>
      <View className="h-2" />
      <SectionContent>
        {!pinned ? (
          <Text className="text-sm">{t("home.pinned_todo.empty_state")}</Text>
        ) : (
            <TodoCardEnhanced {...pinned} badgeType="colored" />
        )}
      </SectionContent>
    </Section>
  );
};
