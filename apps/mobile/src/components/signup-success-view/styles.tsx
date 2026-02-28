import { View, ViewProps } from 'react-native';
import { cn } from '@/lib/cn';

export const Container = (props: ViewProps) => (
  <View className={cn('flex-1 px-4')} {...props} />
);
