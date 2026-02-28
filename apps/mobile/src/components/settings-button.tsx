import { MaterialIcons } from '@expo/vector-icons';
import { ComponentProps, FC } from 'react';
import { Pressable, PressableProps, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/cn';

type IconNames = ComponentProps<typeof MaterialIcons>['name'];

type SettingsButtonProps = {
  iconName: IconNames;
  settingName: string;
  description?: string;
  rightContent?: React.ReactNode;
  className?: string;
} & PressableProps;

export const SettingsButton: FC<SettingsButtonProps> = ({
  iconName = 'america',
  settingName,
  description,
  rightContent,
  className,
  ...rest
}) => {
  return (
    <Pressable
      className={cn(
        'flex-row items-center justify-between rounded-lg bg-grey-50/30 p-4 px-3',
        className
      )}
      {...rest}
    >
      <MaterialIcons name={iconName as any} size={24} className="text-neutrals-dark" />
      <View className="ml-2 flex-1 gap-1">
        <Text className="text-base font-bold">{settingName}</Text>
        {description && (
          <Text className="text-sm">{description}</Text>
        )}
      </View>
      {rightContent && (
        <View className="self-end">{rightContent}</View>
      )}
    </Pressable>
  );
};

SettingsButton.displayName = 'SettingsButton';
