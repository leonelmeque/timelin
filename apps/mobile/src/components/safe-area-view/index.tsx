import { FC } from 'react';
import { SafeAreaView as SafeArea } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';
import { Palette } from '../../ui/atoms';

export const CustomSafeAreaView: FC<SafeAreaViewProps> = ({
  style,
  children,
  ...rest
}) => (
  <SafeArea
    style={[{ backgroundColor: Palette.neutrals.white, flex: 1 }, style]}
    {...rest}
  >
    {children}
  </SafeArea>
);

CustomSafeAreaView.displayName = 'CustomSafeAreaView';
