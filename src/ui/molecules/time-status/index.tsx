import { FC } from 'react';
import { Palette } from '../../atoms/palette';
import { Text } from '../../atoms/typography';
import { distanceBetweenDates } from '../../../lib/utils';

type TimeStatusProps = {
  endDate: string;
  startDate?: string;
  status: string;
};

export const TimeStatus: FC<TimeStatusProps> = ({
  endDate,
  startDate,
  status,
}) => {
  const renderTimeStatus = () => {
    const result = distanceBetweenDates(
      startDate || String(new Date()),
      endDate
    );

    if (result < 7 && status !== 'completed') {
      return (
        <Text size="body" weight="medium" colour={Palette.warning.W400}>
          ⏳ Running out of time
        </Text>
      );
    } else if (result > 7 && result < 30 && status !== 'completed') {
      return (
        <Text size="body" weight="medium" colour={Palette.warning.W400}>
          💨 Time to step up
        </Text>
      );
    } else if (result < 0 && status !== 'completed') {
      return (
        <Text size="body" weight="medium" colour={Palette.danger.D300}>
          ⏳ Out of time
        </Text>
      );
    }

    if (status === 'completed')
      return (
        <Text size="body" weight="medium" colour={Palette.success.S300}>
          🎉 Well done
        </Text>
      );

    return (
      <Text size="body" weight="medium" colour={Palette.success.S300}>
        ⏰ On time
      </Text>
    );
  };

  return renderTimeStatus();
};
