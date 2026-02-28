import { cn } from '@/lib/cn';
import { FC } from 'react';
import { GestureResponderEvent, Pressable, View, Text } from 'react-native';

interface StatusListProps {
  onPress?: (e: GestureResponderEvent, name: string) => void;
  activeStatus?: string;
  className?: string;
}

export const StatusList: FC<StatusListProps> = ({
  onPress,
  activeStatus = 'TODO',
  className,
}) => {
  const status = ['TODO', 'ON_GOING', 'ON_HOLD', 'COMPLETED'];

  if (!onPress) {
    throw new Error('onPress prop is undefined, please add a function');
  }

  const renderStatusList = () =>
    status.map((value, index) => (
      <Pressable
        key={index}
        onPress={(e) => onPress(e, value)}
        className={cn("p-2.5 items-center justify-center rounded-lg", value === activeStatus && "bg-primary-50")}
      >
        <Text className={cn("text-sm font-medium", value === activeStatus ? "text-primary-300" : "text-gray-500")}>
          {(
            value.substring(0, 1) +
            value.substring(1, value.length).toLocaleLowerCase()
          ).replace(/_/g, ' ')}
        </Text>
      </Pressable>
    ));

  return <View className={cn('flex-row justify-between', className)}>{renderStatusList()}</View>;
};

StatusList.displayName = 'StatusList';
