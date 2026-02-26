import { useRouter } from 'expo-router';
import { FC, useState } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFetchTodos, useFilterTodosStatus } from '../store';
import { TodoStatus } from '../lib';
import { Text } from '~/components/ui/text';
import { StackedTasks } from '../components/stacked-tasks';
import { KanbanBoard } from '../components/kanban-board';
import { ViewModeToggle, ViewMode } from '../components/view-mode-toggle';

const FILTERS = [
  { key: 'ALL', label: 'All' },
  { key: TodoStatus.TODO, label: 'Todo' },
  { key: TodoStatus.ON_GOING, label: 'In Progress' },
  { key: TodoStatus.ON_HOLD, label: 'On Hold' },
  { key: TodoStatus.COMPLETED, label: 'Done' },
] as const;

export const ListTodoScreen: FC = () => {
  const router = useRouter();
  const allTodos = useFetchTodos();
  const { filteredData, setStatus } = useFilterTodosStatus();
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<ViewMode>('stack');

  const handleFilter = (key: string) => {
    setActiveFilter(key);
    if (key !== 'ALL') {
      setStatus(key as TodoStatus);
    }
  };

  const displayData = activeFilter === 'ALL' ? allTodos : filteredData;

  return (
    <View className="flex-1 bg-[#191919]">
      {/* Header */}
      <View className="flex-row items-center px-6 pt-12 pb-3 sm:pt-4">
        <Pressable onPress={() => router.back()} className="flex-row items-center mr-4">
          <MaterialIcons name="arrow-back" size={20} color="#9CA3AF" />
        </Pressable>
        <Text className="text-lg font-bold text-white flex-1">All Tasks</Text>
        <ViewModeToggle mode={viewMode} onChange={setViewMode} />
        <Text className="text-xs text-gray-500 ml-3">{displayData?.length || 0} tasks</Text>
      </View>

      {/* Filter bar (only in stack mode — kanban already groups by status) */}
      {viewMode === 'stack' && (
        <View className="px-4 py-3">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row">
              {FILTERS.map(({ key, label }) => (
                <Pressable
                  key={key}
                  onPress={() => handleFilter(key)}
                  className={`px-3 py-1.5 rounded-full mr-2 border ${
                    activeFilter === key
                      ? 'bg-white border-white'
                      : 'bg-transparent border-gray-600'
                  }`}
                >
                  <Text className={`text-xs font-medium ${
                    activeFilter === key ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* Task list */}
      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 100, paddingTop: viewMode === 'kanban' ? 12 : 0 }}>
        {!displayData?.length ? (
          <View className="items-center py-16">
            <MaterialIcons name="inbox" size={40} color="#4B5563" />
            <Text className="text-sm text-gray-500 mt-3">No tasks match this filter</Text>
          </View>
        ) : viewMode === 'stack' ? (
          <StackedTasks tasks={displayData} />
        ) : (
          <KanbanBoard tasks={allTodos || []} />
        )}
      </ScrollView>
    </View>
  );
};

ListTodoScreen.displayName = 'ListTodoScreen';
