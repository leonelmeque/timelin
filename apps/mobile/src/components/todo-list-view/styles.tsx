import { cn } from '@/lib/cn';
import { FlatList, FlatListProps } from 'react-native';

export const TodoList = ({ horizontal, className, ...rest }: FlatListProps<any>) => (
  <FlatList
    horizontal={horizontal}
    className={cn('flex-1 rounded-[19px] m-3.5 p-0.5', className)}
    style={horizontal ? { maxHeight: 200 } : undefined}
    {...rest}
  />
);
