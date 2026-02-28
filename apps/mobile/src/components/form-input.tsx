import { Ref } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/cn';

interface FormInputProps extends TextInputProps {
  label?: string;
  captionText?: string;
  errorText?: string;
  successText?: string;
  disabled?: boolean;
  variant?: 'error' | 'success' | 'caption';
  ref?: Ref<TextInput>;
}

export function FormInput({
  label,
  captionText,
  errorText,
  successText,
  variant,
  ref,
  className,
  ...rest
}: FormInputProps) {
  const caption =
    (variant === 'error' && errorText) ||
    (variant === 'success' && successText) ||
    captionText ||
    '';

  return (
    <View className="gap-1">
      {label && <Label>{label}</Label>}
      <Input
        ref={ref}
        className={cn(
          variant === 'error' && 'border-danger-300',
          variant === 'success' && 'border-success-300',
          className
        )}
        {...rest}
      />
      {caption ? (
        <Text
          className={cn(
            'text-sm',
            variant === 'error' && 'text-danger-200',
            variant === 'success' && 'text-success-300',
            variant === 'caption' && 'text-grey-200'
          )}
        >
          {caption}
        </Text>
      ) : null}
    </View>
  );
}

FormInput.displayName = 'FormInput';
