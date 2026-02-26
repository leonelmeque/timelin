import React, { useState } from 'react';
import { View, Pressable, Animated, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text } from '~/components/ui/text';
import { TodoProps } from '~/lib/shared-types';
import { dateFormatter } from '~/lib/utils';

const PASTEL_COLORS = [
  '#C8D7F5', // soft blue
  '#FDECC8', // soft yellow
  '#F5D1D8', // soft pink
  '#D3EDCE', // soft green
  '#E8DEEE', // soft purple
  '#FADEC9', // soft orange
  '#D3E5EF', // light blue
  '#F1F0EF', // soft gray
];

const STATUS_LABELS: Record<string, string> = {
  TODO: 'Todo',
  ON_GOING: 'In Progress',
  ON_HOLD: 'On Hold',
  COMPLETED: 'Done',
};

const CARD_HEIGHT = 100;
const PEEK_HEIGHT = 60;
const EXPANDED_HEIGHT = 180;
const BORDER_RADIUS = 20;

function TaskStackCard({
  todo,
  index,
  isExpanded,
  onToggle,
  totalCards,
}: {
  todo: TodoProps;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  totalCards: number;
}) {
  const router = useRouter();
  const color = PASTEL_COLORS[index % PASTEL_COLORS.length];
  const isLast = index === totalCards - 1;

  const height = isExpanded ? EXPANDED_HEIGHT : (isLast ? CARD_HEIGHT : PEEK_HEIGHT);

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
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: isLast ? 16 : 0,
        overflow: 'hidden',
        ...(Platform.OS === 'web' ? { cursor: 'pointer', transition: 'height 0.25s ease' } : {}),
      }}
    >
      {/* Top row: title + status */}
      <View className="flex-row items-start justify-between">
        <View className="flex-1 mr-3">
          <Text className="text-base font-bold text-gray-900" numberOfLines={1}>
            {todo.todo}
          </Text>
          <Text className="text-xs text-gray-600 mt-0.5">
            {dateFormatter(todo.timestamp)}
            {todo.deadline ? ` · Due ${dateFormatter(todo.deadline)}` : ''}
          </Text>
        </View>
        <View className="bg-white/80 px-2.5 py-1 rounded-full">
          <Text className="text-2xs font-semibold text-gray-700">
            {STATUS_LABELS[todo.status] || todo.status}
          </Text>
        </View>
      </View>

      {/* Expanded content */}
      {isExpanded && (
        <View className="mt-3">
          {todo.description ? (
            <Text className="text-sm text-gray-700 mb-3" numberOfLines={2}>
              {todo.description}
            </Text>
          ) : null}
          <Pressable
            onPress={() => router.push(`/todo/${todo.id}`)}
            className="flex-row items-center self-start bg-gray-900/10 px-3 py-1.5 rounded-full active:bg-gray-900/20"
          >
            <Text className="text-xs font-semibold text-gray-800">Open task</Text>
            <MaterialIcons name="arrow-forward" size={14} color="#1f2937" style={{ marginLeft: 4 }} />
          </Pressable>
        </View>
      )}
    </Pressable>
  );
}

type Props = {
  tasks: TodoProps[];
};

export const StackedTasks: React.FC<Props> = ({ tasks }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (!tasks.length) return null;

  return (
    <View
      style={{
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
      }}
    >
      {tasks.map((todo, index) => (
        <TaskStackCard
          key={todo.id}
          todo={todo}
          index={index}
          isExpanded={expandedIndex === index}
          onToggle={() => handleToggle(index)}
          totalCards={tasks.length}
        />
      ))}
    </View>
  );
};
