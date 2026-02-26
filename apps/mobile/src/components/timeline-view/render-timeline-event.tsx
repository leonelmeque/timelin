
import { FC, useState } from 'react';
import { View } from 'react-native';
import { ListEvents } from './list-events';
import { EventsDates, Dot, VerticalLine } from './styles';
import { Spacer, Text } from '../../ui/atoms';
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
        <Spacer size="4" />
        <Text size="small" weight="regular">
          {dateFormatter(date, {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          })}
        </Text>
        {compact && (
          <>
            <Spacer size="4" />
            <Text size="small">{description}</Text>
          </>
        )}
      </EventsDates>

      <Spacer size="8" />
      {!compact && <ListEvents data={events} />}
    </View>
  );
};
