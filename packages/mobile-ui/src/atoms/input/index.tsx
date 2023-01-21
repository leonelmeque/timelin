import React, { useState, FC, useEffect, useRef } from 'react';
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
  const [state, setState] = useState<InputVariant>(InputVariant.DEFAULT);

  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (!hasError) setState(InputVariant.FOCUS);
  };

  const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (rest.onFocus) rest?.onFocus(e);
    setState(InputVariant.FOCUS);
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (rest.onBlur) rest.onBlur(e);
    setState(InputVariant.DEFAULT);
  };

  useEffect(() => {
    if (hasError) {
      setState(InputVariant.ERROR);
      return;
    }

    if (disabled) {
      setState(InputVariant.DISABLED);
      return;
    }

    if (success) setState(InputVariant.SUCCESS);
  });

  return (
    <StyledInput
      {...rest}
      variant={state}
      onFocus={onFocus}
      onBlur={onBlur}
      editable={!disabled || !rest.editable}
      onChange={onChange}
      placeholderTextColor={Palette.greys.G75}
    />
  );
};
