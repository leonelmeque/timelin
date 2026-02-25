import { useRouter } from 'expo-router';
import { FC, useState } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFetchTodos, useFilterTodosStatus } from '../store';
import { TodoProps, TodoStatus } from '../lib';
import { dateFormatter } from '../lib/utils';
import { Text } from '~/components/ui/text';

const FILTERS = [
  { key: 'ALL', label: 'All' },
  { key: TodoStatus.TODO, label: 'Todo' },
  { key: TodoStatus.ON_GOING, label: 'In Progress' },
  { key: TodoStatus.ON_HOLD, label: 'On Hold' },
  { key: TodoStatus.COMPLETED, label: 'Done' },
] as const;

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  TODO: { bg: 'bg-tag-gray', text: 'text-fg-secondary' },
  ON_GOING: { bg: 'bg-tag-blue', text: 'text-accent' },
  ON_HOLD: { bg: 'bg-tag-orange', text: 'text-warning-500' },
  COMPLETED: { bg: 'bg-tag-green', text: 'text-success-500' },
};

const STATUS_LABELS: Record<string, string> = {
  TODO: 'Todo',
  ON_GOING: 'In Progress',
  ON_HOLD: 'On Hold',
  COMPLETED: 'Done',
};

function TaskCard({ todo, onPress }: { todo: TodoProps; onPress: () => void }) {
  const style = STATUS_STYLES[todo.status] || STATUS_STYLES.TODO;

  return (
    <Pressable
      onPress={onPress}
      className="bg-bg border border-border rounded-lg p-4 mb-2 active:bg-bg-secondary"
    >
      <View className="flex-row items-start justify-between mb-2">
        <Text className="text-base font-medium text-fg flex-1 mr-3" numberOfLines={2}>
          {todo.todo}
        </Text>
        <View className={`px-2 py-0.5 rounded ${style.bg}`}>
          <Text className={`text-2xs font-medium ${style.text}`}>
            {STATUS_LABELS[todo.status] || todo.status}
          </Text>
        </View>
      </View>
      {todo.description ? (
        <Text className="text-sm text-fg-secondary mb-2" numberOfLines={2}>
          {todo.description}
        </Text>
      ) : null}
      <View className="flex-row items-center">
        <MaterialIcons name="schedule" size={12} color="#B4B4B0" />
        <Text className="text-xs text-fg-tertiary ml-1">
          {dateFormatter(todo.timestamp)}
        </Text>
        {todo.deadline ? (
          <>
            <Text className="text-xs text-fg-tertiary mx-2">·</Text>
            <MaterialIcons name="flag" size={12} color="#B4B4B0" />
            <Text className="text-xs text-fg-tertiary ml-1">
              Due {dateFormatter(todo.deadline)}
            </Text>
          </>
        ) : null}
      </View>
    </Pressable>
  );
}

export const ListTodoScreen: FC = () => {
  const router = useRouter();
  const allTodos = useFetchTodos();
  const { filteredData, setStatus } = useFilterTodosStatus();
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const handleFilter = (key: string) => {
    setActiveFilter(key);
    if (key !== 'ALL') {
      setStatus(key as TodoStatus);
    }
  };

  const displayData = activeFilter === 'ALL' ? allTodos : filteredData;

  return (
    <View className="flex-1 bg-bg">
      {/* Header */}
      <View className="flex-row items-center px-6 pt-12 pb-3 sm:pt-4 border-b border-border">
        <Pressable onPress={() => router.back()} className="flex-row items-center mr-4">
          <MaterialIcons name="arrow-back" size={20} color="#37352F" />
          <Text className="text-sm text-fg ml-1">Back</Text>
        </Pressable>
        <Text className="text-lg font-bold text-fg flex-1">All Tasks</Text>
        <Text className="text-xs text-fg-tertiary">{displayData?.length || 0} tasks</Text>
      </View>

      {/* Filter bar */}
      <View className="px-6 py-3 border-b border-border">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row">
            {FILTERS.map(({ key, label }) => (
              <Pressable
                key={key}
                onPress={() => handleFilter(key)}
                className={`px-3 py-1.5 rounded-full mr-2 border ${
                  activeFilter === key
                    ? 'bg-fg border-fg'
                    : 'bg-bg border-border'
                }`}
              >
                <Text className={`text-xs font-medium ${
                  activeFilter === key ? 'text-fg-inverse' : 'text-fg-secondary'
                }`}>
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Task list */}
      <ScrollView className="flex-1 px-6 pt-4" contentContainerStyle={{ paddingBottom: 100 }}>
        {!displayData?.length ? (
          <View className="items-center py-12">
            <MaterialIcons name="inbox" size={40} color="#B4B4B0" />
            <Text className="text-sm text-fg-tertiary mt-3">No tasks match this filter</Text>
          </View>
        ) : (
          displayData.map((todo: TodoProps) => (
            <TaskCard
              key={todo.id}
              todo={todo}
              onPress={() => router.push(`/todo/${todo.id}`)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

ListTodoScreen.displayName = 'ListTodoScreen';
