import { useRouter, useLocalSearchParams } from 'expo-router';
import { FC } from 'react';
import { View } from 'react-native';
import { TimelineDefaultView } from './default-view';
import { useTimeline, useUpdateTodos } from '../../store/hooks';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { normalizeTimeline } from '../../lib/utils';

type TimelineViewProps = {
  loadingState?: 'hasData' | 'loading' | 'hasError';
};

export const TimelineView: FC<TimelineViewProps> = () => {
  const router = useRouter();
  const { id: todoUID } = useLocalSearchParams<{ id: string }>();

  const { timeline } = useTimeline()
  const { todos } = useUpdateTodos()

  const todoName = todos.find(todo => todo.id === todoUID)?.todo

  const addNewEvent = () => {
    router.push(`/timeline/${todoUID}/add-event`);
  };

  return (
    <View
      className={cn("px-4 flex-1")}
    >
      <View
        style={{
          marginLeft: 110,
          paddingBottom: 16,
        }}
      >
        <Text className="text-lg font-medium" numberOfLines={3}>
          {todoName}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 12,
          paddingBottom: 16,
        }}
      >
        <Text className="text-sm font-medium">
          Timeline
        </Text>
        <View
          style={{
            paddingRight: 50,
          }}
        />
        <Text className="text-sm font-medium">
          Events
        </Text>
      </View>
      <View
        style={{
          overflow: 'hidden',
          flex: 1,
        }}
      >
        <TimelineDefaultView data={normalizeTimeline(timeline)} />
      </View>
      <View
        style={{
          alignItems: 'flex-end'
        }}
      >
        <Button
          variant="ghost"
          size="default"
          onPress={addNewEvent}
        >
          <Text>+ add new event</Text>
        </Button>
      </View>
    </View>
  );
};
