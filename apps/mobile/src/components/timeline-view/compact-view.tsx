import { hooks } from '@todo/commons';
import { Spacer } from '@todo/mobile-ui';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { RenderTimelineEvent } from './render-timeline-event';

export const TimelineCompactView = ({ id }: { id: string }) => {
  const [timeline] = hooks.useFetchTimeline(id as string);
  const [state, setState] = useState<any[] | null>(null);

  useEffect(() => {
    if (state) return;

    const arr: any[] = [];

    if (timeline) {
      const timelineKeys = Object.keys(timeline).slice(
        Object.keys(timeline).length - 4,
        Object.keys(timeline).length
      );

      if (timelineKeys.length >= 1 && timeline) {
        timelineKeys.forEach((_date) => {
          /**
           * TODO: fix this TS error
           */
          //@ts-ignore
          arr.push(timeline[_date].slice(-1)[0]);
        });

        setState(arr);
      }
    }
  });

  if (!state?.length) return <></>;

  return (
    <>
      <FlatList
        data={state}
        ItemSeparatorComponent={() => <Spacer size="8" />}
        renderItem={({ item, index }) => (
          <RenderTimelineEvent
            date={Number(item.timestamp)}
            description={item.description}
            compact
            showVerticalLine={state?.length - 1 !== index}
          />
        )}
      />
      <Spacer size="8" />
    </>
  );
};
