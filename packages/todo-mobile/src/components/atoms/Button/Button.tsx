import React from 'react'
import { Pressable, PressableProps, Text } from 'react-native'
import styled from 'styled-components/native'
import { Label, _sizes, _variants } from './styles';

export interface CommonButtonProps<V = {}, S = {}> extends PressableProps {
  label: string;
  variant: keyof typeof _variants;
  size: keyof typeof _sizes;
  fluid?: boolean;
}

type Props = CommonButtonProps & PressableProps

function StyledButton({ label, style, ...rest }: Props) {
  return (
    <Pressable style={style} {...rest}>
      <Label>{label}</Label>
    </Pressable>
  )
}

const Button = styled(StyledButton) <Omit<Props, 'label'>>`
  all: unset;
  ${(props) => _variants[props.variant]};
  ${(props) => _sizes[props.size]};
  cursor: pointer;
  &:hover {
    background: #ba7da2dd;
  }
`

export default Button