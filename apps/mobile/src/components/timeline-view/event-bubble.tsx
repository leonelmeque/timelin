import { View, ViewProps } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/cn';

export const EventBubble = ({
  title,
  description,
  colour,
  className,
  ...rest
}: {
  title: string;
  description: string;
  colour?: string;
} & ViewProps) => {
  return (
    <View
      className={cn('p-2 rounded-lg', className)}
      style={{ backgroundColor: colour }}
      {...rest}
    >
      <Text className="text-sm font-medium">
        {title}
      </Text>
      <View className="h-2" />
      <Text className="text-sm" numberOfLines={4}>
        {description}
      </Text>
    </View>
  );
};
