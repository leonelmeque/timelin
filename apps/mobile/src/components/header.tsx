import { FC, ReactNode } from 'react';
import { Pressable, PressableProps, View } from 'react-native';
import { cn } from '@/lib/cn';

interface HeaderProps extends PressableProps {
  avatarURI?: string;
  renderLeftContent?: () => ReactNode;
  renderMiddleContent?: () => ReactNode;
  renderRightContent?: () => ReactNode;
  className?: string;
}

export const Header: FC<HeaderProps> = ({
  renderLeftContent = () => <></>,
  renderMiddleContent = () => <></>,
  renderRightContent = () => <></>,
  className,
  ...rest
}) => {
  return (
    <Pressable
      className={cn(
        'flex-row items-center justify-between pt-1 pb-4 pl-4 pr-5',
        className
      )}
      {...rest}
    >
      <View className="justify-start">{renderLeftContent()}</View>
      <View className="justify-center">{renderMiddleContent()}</View>
      <View className="justify-end">{renderRightContent()}</View>
    </Pressable>
  );
};

Header.displayName = 'Header';
