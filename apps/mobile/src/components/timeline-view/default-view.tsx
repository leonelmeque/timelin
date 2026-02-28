
import { FC, useCallback } from 'react';
import { FlatList } from 'react-native';
import { RenderTimelineEvent } from './render-timeline-event';
import { TimelineEventProps } from '../../lib';
import { eventsDateSorter } from '../../lib/utils';
import { View } from 'react-native';

type TimelineDefaultViewProps = {
  data: { [x: string]: TimelineEventProps[] };
};

export const TimelineDefaultView: FC<TimelineDefaultViewProps> = ({ data }) => {
  const memoizedTimeline = Object.entries(data).map(([key, arr]) => [
    key,
    eventsDateSorter(arr),
  ]);

  const renderItem = useCallback(
    ({ item, index }: any) => (
      <RenderTimelineEvent
        showVerticalLine={index !== memoizedTimeline.length - 1}
        date={item[0]}
        events={item[1]}
      />
    ),
    [data, memoizedTimeline]
  );

  return (
    <FlatList
      data={memoizedTimeline}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View className="h-4" />}
      renderItem={renderItem}
    />
  );
};
