import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { FC } from 'react';
import { View } from 'react-native';
import { TimelineDefaultView } from './default-view';
import { useTimeline, useUpdateTodos } from '../../store/hooks';
import { Box, Button, Text } from '../../ui/atoms';
import { normalizeTimeline } from '../../lib/utils';

type TimelineViewProps = {
  loadingState?: 'hasData' | 'loading' | 'hasError';
};

export const TimelineView: FC<TimelineViewProps> = () => {
  const navigation = useNavigation();
  const {
    params: { todoUID },
  } = useRoute<RouteProp<{ params: { todoUID: string } }>>();

  const { timeline } = useTimeline()
  const { todos } = useUpdateTodos()

  const todoName = todos.find(todo => todo.id === todoUID)?.todo

  const addNewEvent = () => {
    //@ts-ignore
    navigation.navigate<any>('Timeline/AddEvent', {
      event: null,
      todoUID,
    });
  };

  return (
    <Box
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          marginLeft: 110,
          paddingBottom: 16,
        }}
      >
        <Text size="large" weight="medium" numberOfLines={3}>
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
        <Text size="small" weight="medium">
          Timeline
        </Text>
        <View
          style={{
            paddingRight: 50,
          }}
        />
        <Text size="small" weight="medium">
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
          variant="tertiary"
          size="md"
          label="+ add new event"
          onPress={addNewEvent}
        />
      </View>
    </Box>
  );
};
