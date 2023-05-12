import { FC } from 'react';
import { TextInputProps } from 'react-native';
import { Caption } from '../../atoms/caption';
import { Input } from '../../atoms/input';
import { Spacer } from '../../atoms/spacer';
import { Text } from '../../atoms/typography';

interface FormInputProps extends TextInputProps {
  label: string;
  captionText?: string;
  errorText?: string;
  successText?: string;
  disabled?: boolean;
  variant?: 'error' | 'success' | 'caption';
}

export const FormInput: FC<FormInputProps> = ({
  label,
  captionText,
  errorText,
  successText,
  variant,
  ...rest
}) => {
  const caption =
    (variant === 'error' && errorText) ||
    (variant === 'success' && successText) ||
    captionText ||
    '';

  return (
    <>
      <Text size="body" weight="bold">
        {label}
      </Text>
      <Spacer size="4" />
      <Input
        {...rest}
        hasError={variant === 'error'}
        success={variant === 'success'}
      />
      <Spacer size="4" />
      {<Caption variant={variant} caption={caption} />}
    </>
  );
};

FormInput.displayName = 'FormInput';
