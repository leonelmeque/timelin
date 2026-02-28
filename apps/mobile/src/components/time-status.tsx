import { FC } from 'react';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/cn';
import { distanceBetweenDates } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const result = distanceBetweenDates(
    startDate || String(new Date()),
    endDate
  );

  let text: string;
  let colorClass: string;

  if (status === 'completed') {
    text = t('todo.time_status.completed');
    colorClass = 'text-success-300';
  } else if (result < 0) {
    text = t('todo.time_status.overdue');
    colorClass = 'text-danger-300';
  } else if (result < 7) {
    text = t('todo.time_status.out_of_time');
    colorClass = 'text-warning-400';
  } else if (result < 30) {
    text = t('todo.time_status.step_up');
    colorClass = 'text-warning-400';
  } else {
    text = t('todo.time_status.on_time');
    colorClass = 'text-success-300';
  }

  return (
    <Text className={cn('text-base font-medium', colorClass)}>
      {text}
    </Text>
  );
};

TimeStatus.displayName = 'TimeStatus';
