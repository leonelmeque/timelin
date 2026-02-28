import { cn } from '@/lib/cn';
import { Dimensions, View, ViewProps } from 'react-native';

export const SearchViewDefault = ({ className, ...props }: ViewProps) => (
  <View
    className={cn('items-center justify-center px-4', className)}
    style={{ height: Dimensions.get('screen').height / 2 }}
    {...props}
  />
);

export const SearchViewResultsView = ({ className, ...props }: ViewProps) => (
  <View className={cn('flex-row justify-between px-4', className)} {...props} />
);
