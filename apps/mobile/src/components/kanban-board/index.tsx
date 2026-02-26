import React, { useState } from 'react';
import { View, ScrollView, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from '~/components/ui/text';
import { TodoProps, TodoStatus } from '~/lib/shared-types';
import { dateFormatter } from '~/lib/utils';

const PASTEL_COLORS = [
  '#C8D7F5', '#FDECC8', '#F5D1D8', '#D3EDCE',
  '#E8DEEE', '#FADEC9', '#D3E5EF', '#F1F0EF',
];

const COLUMNS = [
  { key: TodoStatus.TODO, label: 'Todo', dotColor: '#9CA3AF' },
  { key: TodoStatus.ON_GOING, label: 'In Progress', dotColor: '#2383E2' },
  { key: TodoStatus.ON_HOLD, label: 'On Hold', dotColor: '#D97706' },
  { key: TodoStatus.COMPLETED, label: 'Done', dotColor: '#16A34A' },
] as const;

const CARD_PEEK = 52;
const CARD_EXPANDED = 140;
const BORDER_RADIUS = 16;

function KanbanCard({
  todo, colorIndex, isLast, isExpanded, onToggle,
}: {
  todo: TodoProps; colorIndex: number; isLast: boolean;
  isExpanded: boolean; onToggle: () => void;
}) {
  const router = useRouter();
  const color = PASTEL_COLORS[colorIndex % PASTEL_COLORS.length];
  const height = isExpanded ? CARD_EXPANDED : (isLast ? 80 : CARD_PEEK);

  return (
    <Pressable
      onPress={onToggle}
      onLongPress={() => router.push(`/todo/${todo.id}`)}
      style={{
        height,
        backgroundColor: color,
        borderTopLeftRadius: BORDER_RADIUS,
        borderTopRightRadius: BORDER_RADIUS,
        borderBottomLeftRadius: isLast ? BORDER_RADIUS : 0,
        borderBottomRightRadius: isLast ? BORDER_RADIUS : 0,
        paddingHorizontal: 14,
        paddingTop: 10,
        overflow: 'hidden',
        ...(Platform.OS === 'web' ? { cursor: 'pointer', transition: 'height 0.2s ease' } : {}),
      }}
    >
      <Text className="text-sm font-bold text-gray-900" numberOfLines={1}>
        {todo.todo}
      </Text>
      <Text className="text-2xs text-gray-600 mt-0.5">{dateFormatter(todo.timestamp)}</Text>

      {isExpanded && (
        <View className="mt-2">
          {todo.description ? (
            <Text className="text-xs text-gray-700 mb-2" numberOfLines={2}>{todo.description}</Text>
          ) : null}
          <Pressable
            onPress={() => router.push(`/todo/${todo.id}`)}
            className="flex-row items-center self-start bg-gray-900/10 px-2.5 py-1 rounded-full active:bg-gray-900/20"
          >
            <Text className="text-2xs font-semibold text-gray-800">Open</Text>
            <MaterialIcons name="arrow-forward" size={12} color="#1f2937" style={{ marginLeft: 3 }} />
          </Pressable>
        </View>
      )}
    </Pressable>
  );
}

type Props = { tasks: TodoProps[] };

export const KanbanBoard: React.FC<Props> = ({ tasks }) => {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const columnWidth = Platform.OS === 'web' ? 240 : 200;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 16 }}
    >
      {COLUMNS.map((col) => {
        const items = tasks.filter((t) => t.status === col.key);
        return (
          <View key={col.key} style={{ width: columnWidth, marginRight: 10 }}>
            {/* Column header */}
            <View className="flex-row items-center mb-2 px-1">
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: col.dotColor, marginRight: 6 }} />
              <Text className="text-xs font-semibold text-gray-300">{col.label}</Text>
              <View className="ml-1.5 bg-white/10 px-1.5 py-0.5 rounded">
                <Text className="text-2xs text-gray-500 font-medium">{items.length}</Text>
              </View>
            </View>

            {/* Stacked cards */}
            {items.length === 0 ? (
              <View style={{ backgroundColor: '#1F1F1F', borderRadius: BORDER_RADIUS, padding: 8, minHeight: 80 }}>
                <View className="items-center justify-center py-4">
                  <Text className="text-2xs text-gray-600">No tasks</Text>
                </View>
              </View>
            ) : (
              <View style={{ borderRadius: BORDER_RADIUS, overflow: 'hidden' }}>
                {items.map((todo, i) => {
                  const cardKey = `${col.key}-${todo.id}`;
                  return (
                    <KanbanCard
                      key={todo.id}
                      todo={todo}
                      colorIndex={COLUMNS.indexOf(col) * 2 + i}
                      isLast={i === items.length - 1}
                      isExpanded={expandedKey === cardKey}
                      onToggle={() => setExpandedKey(expandedKey === cardKey ? null : cardKey)}
                    />
                  );
                })}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};
