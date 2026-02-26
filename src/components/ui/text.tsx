import * as React from 'react';
import { Text as RNText } from 'react-native';
import { cn } from '~/lib/cn';

const TextClassContext = React.createContext<string>('');

type TextProps = React.ComponentPropsWithoutRef<typeof RNText> & {
  className?: string;
  ref?: React.Ref<React.ComponentRef<typeof RNText>>;
};

function Text({ className, ref, ...props }: TextProps) {
  const textClass = React.useContext(TextClassContext);
  return (
    <RNText
      className={cn('text-base text-foreground web:select-text', textClass, className)}
      ref={ref}
      {...props}
    />
  );
}
Text.displayName = 'Text';

export { Text, TextClassContext };
