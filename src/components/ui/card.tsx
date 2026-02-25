import * as React from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/cn';

type CardProps = React.ComponentPropsWithoutRef<typeof View> & {
  className?: string;
};

const Card = React.forwardRef<React.ElementRef<typeof View>, CardProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn('rounded-2xl bg-white border border-gray-100 shadow-sm', className)}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<React.ElementRef<typeof View>, CardProps>(
  ({ className, ...props }, ref) => (
    <View ref={ref} className={cn('p-4 pb-0', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardContent = React.forwardRef<React.ElementRef<typeof View>, CardProps>(
  ({ className, ...props }, ref) => (
    <View ref={ref} className={cn('p-4', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<React.ElementRef<typeof View>, CardProps>(
  ({ className, ...props }, ref) => (
    <View ref={ref} className={cn('flex-row items-center p-4 pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardContent, CardFooter };
