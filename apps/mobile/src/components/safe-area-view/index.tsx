import { FC } from 'react';
import { SafeAreaView as SafeArea } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';
import { cn } from '@/lib/cn';

export const CustomSafeAreaView: FC<SafeAreaViewProps> = ({
  style,
  children,
  ...rest
}) => (
  <SafeArea
    className={cn("bg-neutrals-white flex-1")}
    style={style}
    {...rest}
  >
    {children}
  </SafeArea>
);

CustomSafeAreaView.displayName = 'CustomSafeAreaView';
