import * as React from 'react';
import { Platform, View, type ViewProps } from 'react-native';
import Animated, { type AnimatedProps } from 'react-native-reanimated';

type NativeOnlyAnimatedViewProps = AnimatedProps<ViewProps> & {
  children?: React.ReactNode;
};

/**
 * An Animated.View wrapper that only applies animations on native platforms.
 * On web, it renders a plain View to avoid reanimated web compatibility issues.
 */
function NativeOnlyAnimatedView({ children, ...props }: NativeOnlyAnimatedViewProps) {
  if (Platform.OS === 'web') {
    const { entering, exiting, layout, ...viewProps } = props as any;
    return <View {...viewProps}>{children}</View>;
  }

  return <Animated.View {...props}>{children}</Animated.View>;
}

export { NativeOnlyAnimatedView };
