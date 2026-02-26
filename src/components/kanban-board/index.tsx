import React from 'react';
import { View, ScrollView, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from '~/components/ui/text';
import { TodoProps, TodoStatus } from '~/lib/shared-types';
import { dateFormatter } from '~/lib/utils';

const COLUMNS = [
  { key: TodoStatus.TODO, label: 'Todo', dotColor: '#9CA3AF', bg: 'bg-tag-gray' },
  { key: TodoStatus.ON_GOING, label: 'In Progress', dotColor: '#2383E2', bg: 'bg-tag-blue' },
  { key: TodoStatus.ON_HOLD, label: 'On Hold', dotColor: '#D97706', bg: 'bg-tag-orange' },
  { key: TodoStatus.COMPLETED, label: 'Done', dotColor: '#16A34A', bg: 'bg-tag-green' },
] as const;

function KanbanCard({ todo }: { todo: TodoProps }) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/todo/${todo.id}`)}
      style={{
        backgroundColor: '#2A2A2A',
        borderRadius: 10,
        padding: 12,
        marginBottom: 8,
        ...(Platform.OS === 'web'
          ? { cursor: 'pointer', transition: 'background-color 0.15s' }
          : {}),
      }}
      className="active:bg-white/10"
    >
      <Text className="text-sm font-medium text-white mb-1" numberOfLines={2}>
        {todo.todo}
      </Text>
      {todo.description ? (
        <Text className="text-xs text-gray-400 mb-2" numberOfLines={2}>
          {todo.description}
        </Text>
      ) : null}
      <View className="flex-row items-center">
        <MaterialIcons name="schedule" size={10} color="#6B7280" />
        <Text className="text-2xs text-gray-500 ml-1">
          {dateFormatter(todo.timestamp)}
        </Text>
      </View>
    </Pressable>
  );
}

type Props = {
  tasks: TodoProps[];
};

export const KanbanBoard: React.FC<Props> = ({ tasks }) => {
  const columnWidth = Platform.OS === 'web' ? 260 : 220;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 16 }}
    >
      {COLUMNS.map((col) => {
        const items = tasks.filter((t) => t.status === col.key);
        return (
          <View
            key={col.key}
            style={{ width: columnWidth, marginRight: 12 }}
          >
            {/* Column header */}
            <View className="flex-row items-center mb-3 px-1">
              <View
                style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: col.dotColor, marginRight: 8 }}
              />
              <Text className="text-sm font-semibold text-gray-300">{col.label}</Text>
              <View className="ml-2 bg-white/10 px-1.5 py-0.5 rounded">
                <Text className="text-2xs text-gray-400 font-medium">{items.length}</Text>
              </View>
            </View>

            {/* Cards */}
            <View
              style={{
                backgroundColor: '#1F1F1F',
                borderRadius: 12,
                padding: 8,
                minHeight: 120,
                flex: 1,
              }}
            >
              {items.length === 0 ? (
                <View className="items-center justify-center py-8">
                  <Text className="text-xs text-gray-600">No tasks</Text>
                </View>
              ) : (
                items.map((todo) => <KanbanCard key={todo.id} todo={todo} />)
              )}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};
