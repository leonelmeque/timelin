import React, { useState } from 'react';
import { View, Pressable, Platform } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text } from '~/components/ui/text';
import { TodoProps } from '~/lib/shared-types';
import { dateFormatter } from '~/lib/utils';

const PASTEL_COLORS = [
  '#C8D7F5', '#FDECC8', '#F5D1D8', '#D3EDCE',
  '#E8DEEE', '#FADEC9', '#D3E5EF', '#F1F0EF',
];

const STATUS_LABELS: Record<string, string> = {
  TODO: 'Todo',
  ON_GOING: 'In Progress',
  ON_HOLD: 'On Hold',
  COMPLETED: 'Done',
};

const COLLAPSED_HEIGHT = 64;
const EXPANDED_HEIGHT = 180;
const BORDER_RADIUS = 20;

const SPRING_CONFIG = {
  damping: 18,
  stiffness: 120,
  mass: 0.8,
};

function AnimatedCard({
  todo,
  index,
  isExpanded,
  isLast,
  onToggle,
  totalCards,
}: {
  todo: TodoProps;
  index: number;
  isExpanded: boolean;
  isLast: boolean;
  onToggle: () => void;
  totalCards: number;
}) {
  const router = useRouter();
  const color = PASTEL_COLORS[index % PASTEL_COLORS.length];

  const animatedStyle = useAnimatedStyle(() => {
    const height = withSpring(
      isExpanded ? EXPANDED_HEIGHT : (isLast ? COLLAPSED_HEIGHT + 20 : COLLAPSED_HEIGHT),
      SPRING_CONFIG
    );

    const scale = withSpring(
      isExpanded ? 1 : interpolate(index, [0, totalCards], [1, 0.98]),
      SPRING_CONFIG
    );

    return { height, transform: [{ scale }] };
  }, [isExpanded, isLast, index, totalCards]);

  return (
    <Animated.View
      style={[
        {
          backgroundColor: color,
          borderTopLeftRadius: BORDER_RADIUS,
          borderTopRightRadius: BORDER_RADIUS,
          borderBottomLeftRadius: isLast ? BORDER_RADIUS : 0,
          borderBottomRightRadius: isLast ? BORDER_RADIUS : 0,
          paddingHorizontal: 20,
          paddingTop: 14,
          paddingBottom: isLast ? 14 : 0,
          overflow: 'hidden',
        },
        animatedStyle,
      ]}
    >
      <Pressable onPress={onToggle} onLongPress={() => router.push(`/todo/${todo.id}`)}>
        {/* Header row */}
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
          <View className="bg-white/70 px-2.5 py-1 rounded-full">
            <Text className="text-2xs font-semibold text-gray-700">
              {STATUS_LABELS[todo.status] || todo.status}
            </Text>
          </View>
        </View>

        {/* Expanded content */}
        {isExpanded && (
          <Animated.View className="mt-3">
            {todo.description ? (
              <Text className="text-sm text-gray-700 mb-3" numberOfLines={3}>
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
          </Animated.View>
        )}
      </Pressable>
    </Animated.View>
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
    <View style={{ borderRadius: BORDER_RADIUS, overflow: 'hidden' }}>
      {tasks.map((todo, index) => (
        <AnimatedCard
          key={todo.id}
          todo={todo}
          index={index}
          isExpanded={expandedIndex === index}
          isLast={index === tasks.length - 1}
          onToggle={() => handleToggle(index)}
          totalCards={tasks.length}
        />
      ))}
    </View>
  );
};
