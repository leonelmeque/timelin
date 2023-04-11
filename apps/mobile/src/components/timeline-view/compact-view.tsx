import { eventsDateSorter } from '@todo/commons';
import { Palette, Spacer, Text } from '@todo/mobile-ui';
import { useFetchTimeline, useTimeline } from '@todo/store';
import { useMemo, useRef } from 'react';
import { FlatList, Pressable } from 'react-native';
import { RenderTimelineEvent } from './render-timeline-event';
import { useNavigation } from '@react-navigation/native';

export const TimelineCompactView = ({ id }: { id: string }) => {
  const { value } = useFetchTimeline(id);
  const { timeline } = useTimeline();
  const navigation = useNavigation();

  const ref = useRef(1);

  const normalizeData = useMemo(() => {
    if (value.state === 'loading' || value.state === 'hasError') {
      return [];
    }

    const arr = timeline.slice(timeline.length - 4, timeline.length);

    if (!timeline.length) {
      ref.current = arr.length;
    }

    return eventsDateSorter(arr);
  }, [value]);

  if (value.state === 'loading') return <Text size="body">Loading data</Text>;
  if (value.state === 'hasError')
    return <Text size="body">Error loading data</Text>;

  return (
    <>
      <Pressable
        onPress={() => {
          //@ts-ignore
          navigation.navigate<any>('Timeline/Default', {
            todoUID: id,
          });
        }}
      >
        <FlatList
          data={normalizeData}
          ItemSeparatorComponent={() => <Spacer size="8" />}
          renderItem={({ item, index }) => (
            <RenderTimelineEvent
              date={Number(item.timestamp)}
              description={item.title}
              compact
              showVerticalLine={ref.current - 2 !== index}
            />
          )}
        />
      </Pressable>
      {normalizeData.length !== 0 && <Spacer size="8" />}
      <Pressable
        onPress={() => {
          //@ts-ignore
          navigation.navigate<any>('Timeline/AddEvent', {
            todoUID: id,
          });
        }}
      >
        <Text size="body" weight="medium" colour={Palette.primary.P300}>
          + Add new timeline event
        </Text>
      </Pressable>
    </>
  );
};
