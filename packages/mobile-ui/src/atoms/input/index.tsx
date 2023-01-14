import React, { useState, FC } from 'react';
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import { StyledInput } from './styles';

export const Input: FC<TextInputProps> = (props) => {
  const [hasFocus, sethasFocus] = useState(false);

  const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (props.onFocus) props?.onFocus(e);
    sethasFocus(!hasFocus);
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (props.onBlur) props.onBlur(e);
    sethasFocus(!hasFocus);
  };

  return (
    <StyledInput
      {...props}
      hasFocus={hasFocus}
      onFocus={onFocus}
      onBlur={onBlur}
      isDisabled={!!props.editable}
    />
  );
};
