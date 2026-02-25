import * as React from 'react';
import { TextInput } from 'react-native';
import { cn } from '~/lib/cn';

type InputProps = React.ComponentPropsWithoutRef<typeof TextInput> & {
  className?: string;
};

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, placeholderTextColor, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          'h-12 rounded-xl border border-gray-200 bg-white px-4 text-base text-gray-900',
          'placeholder:text-gray-400',
          'focus:border-primary-300',
          props.editable === false && 'opacity-50',
          className
        )}
        placeholderTextColor={placeholderTextColor ?? '#9CA3AF'}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
