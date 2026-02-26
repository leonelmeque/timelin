import { Ref } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  TextInputFocusEventData,
  TextInputProps,
} from "react-native";
import { Palette } from "../palette";
import { InputVariant, StyledInput } from "./styles";

interface InputProps extends TextInputProps {
  disabled?: boolean;
  hasError?: boolean;
  success?: boolean;
  ref?: Ref<TextInput>;
}

export function Input({ hasError, disabled, success, ref, ...rest }: InputProps) {
  let variant;

  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (!hasError) {
      variant = InputVariant.FOCUS;
    }
  };

  const onFocus = (e: any) => {
    if (rest.onFocus) rest?.onFocus(e);
    variant = InputVariant.FOCUS;
  };

  const onBlur = (e: any) => {
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
      ref={ref}
      variant={variant}
      onFocus={onFocus}
      onBlur={onBlur}
      editable={!disabled}
      onChange={onChange}
      placeholderTextColor={Palette.greys.G75}
      {...rest}
    />
  );
}
