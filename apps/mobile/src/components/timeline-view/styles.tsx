import { View, ViewProps } from 'react-native';
import { cn } from '@/lib/cn';

export const Dot = ({ className, ...props }: ViewProps) => (
  <View
    className={cn('w-2.5 h-2.5 rounded-full', className)}
    style={{ backgroundColor: '#BFBCDC' }}
    {...props}
  />
);

export const VerticalLine = ({ height, className, ...props }: ViewProps & { height?: number }) => (
  <View
    className={cn('w-0.5 flex-1 self-stretch absolute left-1 top-3 -z-10 bg-primary-50', className)}
    style={{ height: height ?? 0 }}
    {...props}
  />
);

export const EventsDates = ({ className, ...props }: ViewProps) => (
  <View className={cn('flex-row items-center mt-3.5', className)} {...props} />
);
