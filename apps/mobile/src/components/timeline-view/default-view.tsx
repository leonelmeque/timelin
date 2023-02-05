import { TimelineEventProps } from '@todo/commons';
import { Spacer } from '@todo/mobile-ui';
import { FC } from 'react';
import { FlatList } from 'react-native';
import { RenderTimelineEvent } from './render-timeline-event';

type TimelineDefaultViewProps = {
  data: [string, TimelineEventProps[]][];
};

export const TimelineDefaultView: FC<TimelineDefaultViewProps> = ({ data }) => {
  const renderItem = ({ item, index }: any) => (
    <RenderTimelineEvent
      showVerticalLine={index !== data.length - 1}
      date={item[0]}
      events={item[1]}
    />
  );

  return (
    <FlatList
      data={data}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <Spacer size="8" />}
      renderItem={renderItem}
    />
  );
};
