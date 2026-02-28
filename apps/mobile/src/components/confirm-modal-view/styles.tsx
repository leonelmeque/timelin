import { View, ViewProps } from 'react-native';
import { cn } from '@/lib/cn';

export const Container = (props: ViewProps) => (
  <View
    className={cn("mt-auto pt-8 pb-16 rounded-t-[32px] px-4 bg-neutrals-white")}
    {...props}
  />
);

export const Overlay = ({ width, height, ...props }: ViewProps & { width?: number; height?: number }) => (
  <View
    className={cn("absolute opacity-10 bg-grey-500")}
    style={{
      width,
      height,
    }}
    {...props}
  />
);

export const ActionsContainer = (props: ViewProps) => (
  <View className={cn("flex-row self-end px-4")} {...props} />
);
