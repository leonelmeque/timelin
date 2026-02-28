
import { FC, useState } from 'react';
import { View } from 'react-native';
import { ListEvents } from './list-events';
import { EventsDates, Dot, VerticalLine } from './styles';
import { Text } from '@/components/ui/text';
import { dateFormatter } from '../../lib/utils';

type RenderItemProps = {
  showVerticalLine: boolean;
  date: string | number;
  events?: [];
  compact?: boolean;
  description?: string;
};

export const RenderTimelineEvent: FC<RenderItemProps> = ({
  showVerticalLine = false,
  date,
  events,
  compact,
  description,
  ...rest
}) => {
  const [state, setState] = useState(0);

  return (
    <View
      {...rest}
      style={{
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'flex-start',
      }}
      onLayout={(event) => {
        setState(Math.floor(event.nativeEvent.layout.height + 14));
      }}
    >
      <EventsDates>
        <Dot />
        {showVerticalLine && <VerticalLine height={state} />}
        <View className="h-2" />
        <Text className="text-sm">
          {dateFormatter(date, {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          })}
        </Text>
        {compact && (
          <>
            <View className="h-2" />
            <Text className="text-sm">{description}</Text>
          </>
        )}
      </EventsDates>

      <View className="w-4" />
      {!compact && <ListEvents data={events} />}
    </View>
  );
};
