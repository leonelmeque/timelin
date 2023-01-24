import { FC } from 'react';
import { SafeAreaView as SafeArea } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';
import { FunnyBadge } from '../molecules/Header/styles';

export const CustomSafeAreaView: FC<SafeAreaViewProps> = ({ children, ...rest }) => (
  <SafeArea {...rest}>{children}</SafeArea>
);

CustomSafeAreaView.displayName = 'CustomSafeAreaView';
