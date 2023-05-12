import { FC } from 'react';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import { Palette } from '../palette';
import { InputVariant, StyledInput } from './styles';

type InputProps = {
  disabled?: boolean;
  hasError?: boolean;
  success?: boolean;
};

export const Input: FC<TextInputProps & InputProps> = ({
  hasError,
  disabled,
  success,
  ...rest
}) => {
  let variant;

  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (!hasError) {
      variant = InputVariant.FOCUS;
    }
  };

  const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (rest.onFocus) rest?.onFocus(e);
    variant = InputVariant.FOCUS;
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (rest.onBlur) rest.onBlur(e);
    variant = InputVariant.DEFAULT;
  };

  const setInputVariant = () => {
    if (hasError) {
      return InputVariant.ERROR;
    } else if (disabled) {
      return InputVariant.DISABLED;
    } else if (success) {
      return InputVariant.SUCCESS;
    }
    return InputVariant.DEFAULT;
  };

  variant = setInputVariant();

  return (
    <StyledInput
      {...rest}
      variant={variant}
      onFocus={onFocus}
      onBlur={onBlur}
      editable={!disabled}
      onChange={onChange}
      placeholderTextColor={Palette.greys.G75}
    />
  );
};
