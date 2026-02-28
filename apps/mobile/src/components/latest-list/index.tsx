import React from 'react'
import { Section, SectionContent, SectionHeader } from './styles';
import { withOptionsModal } from '../with-options-modal';
import { useLatest, useUpdateTodos } from '../../store';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { TodoCard } from '@/components/todo-card';
import { useTranslation } from 'react-i18next';


const TodoCardEnhanced = withOptionsModal(TodoCard);

export const LatestList = () => {
  const { t } = useTranslation()
  const { latestChanged } = useLatest();
  const { todos } = useUpdateTodos();

  const pinned = todos.find((todo) => todo.id === latestChanged);

  return (
    <Section accessibilityLabel="Latest">
      <SectionHeader>
        <Text className="font-medium">
          {t("home.latest.heading")}
        </Text>
      </SectionHeader>
      <View className="h-2" />
      <SectionContent>
        {!pinned ? (
          <Text className="text-sm">{t("home.latest.empty_state")}</Text>
        ) : (
          <TodoCardEnhanced {...pinned} badgeType="colored" />
        )}
      </SectionContent>
    </Section>
  );
};
