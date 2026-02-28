import { cn } from '@/lib/cn';
import { View, ViewProps } from 'react-native';

export const SectionHeader = ({ className, ...props }: ViewProps) => (
  <View className={cn('flex-row justify-between px-4', className)} {...props} />
);

export const SectionContent = ({ className, ...props }: ViewProps) => (
  <View className={cn('flex-1', className)} {...props} />
);

export const Section = ({ className, ...props }: ViewProps) => (
  <View className={cn('flex-1 px-4', className)} style={{ padding: 0, height: 150 }} {...props} />
);
