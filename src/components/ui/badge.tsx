import * as React from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/cn';
import { TextClassContext } from './text';

const badgeVariants = {
  default: 'bg-primary-500',
  secondary: 'bg-primary-50',
  success: 'bg-success-50',
  warning: 'bg-warning-50',
  danger: 'bg-danger-50',
  outline: 'border border-gray-200 bg-transparent',
};

const textVariants = {
  default: 'text-white text-xs font-semibold',
  secondary: 'text-primary-500 text-xs font-semibold',
  success: 'text-success-500 text-xs font-semibold',
  warning: 'text-warning-500 text-xs font-semibold',
  danger: 'text-danger-500 text-xs font-semibold',
  outline: 'text-gray-700 text-xs font-semibold',
};

type BadgeProps = React.ComponentPropsWithoutRef<typeof View> & {
  className?: string;
  variant?: keyof typeof badgeVariants;
};

const Badge = React.forwardRef<React.ElementRef<typeof View>, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => (
      <TextClassContext.Provider value={textVariants[variant]}>
        <View
          ref={ref}
          className={cn(
            'items-center rounded-full px-3 py-1',
            badgeVariants[variant],
            className
          )}
          {...props}
        />
      </TextClassContext.Provider>
    )
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
