import { useRouter } from 'expo-router';
import React, { Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TodoListView } from '../todo-list-view';
import { Section, SectionHeader, SectionContent } from './styles';
import { useFetchTodos } from '../../store';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { cn } from '@/lib/cn';

export const ProjectList = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const todos = useFetchTodos();

  const nagivateToTodoList = () => {
    router.push("/list-todos");
  };

  if (!todos) return <Text>Loading Projects</Text>;

  return (
    <Section accessibilityLabel="Projects">
      <SectionHeader>
        <Text className="font-medium">
          {t('home.project_list.heading')}
        </Text>
        <Pressable onPress={nagivateToTodoList}>
          <Text className="text-sm font-medium text-primary-300">
            {t('general.more')}
          </Text>
        </Pressable>
      </SectionHeader>
      <View className="h-2" />
      <SectionContent>
        <View className={cn("px-4")}>
          {!todos.length && (
            <Text className="text-sm">Looks like you don't have any projects</Text>
          )}
        </View>
        {todos && <TodoListView horizontal data={todos} />}
      </SectionContent>
    </Section>
  );
};
