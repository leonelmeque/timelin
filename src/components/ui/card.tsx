import * as React from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/cn';

type CardProps = React.ComponentPropsWithoutRef<typeof View> & {
  className?: string;
  ref?: React.Ref<React.ComponentRef<typeof View>>;
};

function Card({ className, ref, ...props }: CardProps) {
  return (
    <View
      ref={ref}
      className={cn('rounded-2xl bg-white border border-gray-100 shadow-sm', className)}
      {...props}
    />
  );
}
Card.displayName = 'Card';

function CardHeader({ className, ref, ...props }: CardProps) {
  return <View ref={ref} className={cn('p-4 pb-0', className)} {...props} />;
}
CardHeader.displayName = 'CardHeader';

function CardContent({ className, ref, ...props }: CardProps) {
  return <View ref={ref} className={cn('p-4', className)} {...props} />;
}
CardContent.displayName = 'CardContent';

function CardFooter({ className, ref, ...props }: CardProps) {
  return <View ref={ref} className={cn('flex-row items-center p-4 pt-0', className)} {...props} />;
}
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardContent, CardFooter };
