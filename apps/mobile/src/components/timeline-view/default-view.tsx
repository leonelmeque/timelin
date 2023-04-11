import { TimelineEventProps, eventsDateSorter } from '@todo/commons';
import { Spacer } from '@todo/mobile-ui';
import { FC, useCallback } from 'react';
import { FlatList } from 'react-native';
import { RenderTimelineEvent } from './render-timeline-event';

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
      ItemSeparatorComponent={() => <Spacer size="8" />}
      renderItem={renderItem}
    />
  );
};
