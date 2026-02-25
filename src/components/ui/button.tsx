import * as React from 'react';
import { Pressable, View } from 'react-native';
import { cn } from '~/lib/cn';
import { TextClassContext } from './text';

const buttonVariants = {
  default: 'bg-primary-500 active:opacity-90',
  destructive: 'bg-danger-500 active:opacity-90',
  outline: 'border border-primary-100 bg-transparent active:bg-primary-50',
  secondary: 'bg-primary-50 active:opacity-80',
  ghost: 'active:bg-primary-50',
  link: 'underline-offset-4 active:underline',
};

const buttonSizes = {
  default: 'h-12 px-5 rounded-xl',
  sm: 'h-9 px-3 rounded-lg',
  lg: 'h-14 px-8 rounded-xl',
  icon: 'h-10 w-10 rounded-full',
};

const textVariants = {
  default: 'text-white font-semibold text-base',
  destructive: 'text-white font-semibold text-base',
  outline: 'text-primary-500 font-semibold text-base',
  secondary: 'text-primary-500 font-semibold text-base',
  ghost: 'text-primary-500 font-semibold text-base',
  link: 'text-primary-500 font-semibold text-base underline',
};

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> & {
  className?: string;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
};

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    return (
      <TextClassContext.Provider value={textVariants[variant]}>
        <Pressable
          className={cn(
            'flex-row items-center justify-center',
            buttonVariants[variant],
            buttonSizes[size],
            props.disabled && 'opacity-50',
            className
          )}
          ref={ref}
          role="button"
          {...props}
        >
          {children}
        </Pressable>
      </TextClassContext.Provider>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
