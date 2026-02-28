import { FC } from 'react';
import { View } from 'react-native';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/cn';
import { TodoProps, TodoStatus } from '@/lib/shared-types';
import { dateFormatter } from '@/lib/utils';

const BadgeBGColorClass: Record<TodoStatus, string> = {
  [TodoStatus.ON_GOING]: 'bg-badge-ongoing-bg',
  [TodoStatus.COMPLETED]: 'bg-badge-completed-bg',
  [TodoStatus.ON_HOLD]: 'bg-badge-onhold-bg',
  [TodoStatus.TODO]: 'bg-badge-todo-bg',
};

const BadgeTextColorClass: Record<TodoStatus, string> = {
  [TodoStatus.ON_GOING]: 'text-badge-ongoing-text',
  [TodoStatus.COMPLETED]: 'text-badge-completed-text',
  [TodoStatus.ON_HOLD]: 'text-badge-onhold-text',
  [TodoStatus.TODO]: 'text-badge-todo-text',
};

const TodoCardBGColorClass: Record<string, string> = {
  blue: 'bg-todo-blue',
  green: 'bg-todo-green',
  orange: 'bg-todo-orange',
  pink: 'bg-todo-pink',
  yellow: 'bg-todo-yellow',
};

function formatStatus(status: string): string {
  return (
    status.substring(0, 1).toUpperCase() +
    status.substring(1).toLocaleLowerCase()
  ).replace(/_/g, ' ');
}

interface TodoCardProps extends Omit<TodoProps, 'assigned'> {
  assigned?: string[];
  showStatus?: boolean;
  showDescription?: boolean;
  badgeType?: 'colored' | 'simple';
}

export const TodoCard: FC<TodoCardProps> = ({
  color,
  todo,
  timestamp,
  status,
  description,
  showStatus,
  showDescription,
  badgeType = 'simple',
}) => (
  <View
    className={cn(
      'flex-1 rounded-[20px] p-6 px-4',
      TodoCardBGColorClass[color] ?? 'bg-primary-50'
    )}
  >
    <View className="flex-row items-center justify-between">
      <Text className="text-sm font-medium text-grey-200">
        {dateFormatter(timestamp)}
      </Text>
      {showStatus && (
        <Badge
          variant={badgeType === 'simple' ? 'outline' : 'default'}
          className={cn(
            badgeType === 'colored' &&
              cn(
                'rounded rounded-br-none border-transparent p-2',
                BadgeBGColorClass[status]
              )
          )}
        >
          <Text
            className={cn(
              'text-sm font-medium',
              badgeType === 'colored'
                ? BadgeTextColorClass[status]
                : undefined
            )}
          >
            {formatStatus(status)}
          </Text>
        </Badge>
      )}
    </View>
    <View>
      <Text className="text-lg font-bold" numberOfLines={1}>
        {todo}
      </Text>
      {showDescription && (
        <View className="gap-1 mt-1">
          <Text className="text-sm" numberOfLines={2}>
            {description}
          </Text>
        </View>
      )}
    </View>
  </View>
);

TodoCard.displayName = 'TodoCard';
