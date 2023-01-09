import React from 'react';
import styled from 'styled-components/native';
import { View, Text, PressableProps, Pressable } from 'react-native';
import { _sizes, _variants } from './styles';

export interface Props extends PressableProps {
  label: string;
  variant: keyof typeof _variants;
  size: keyof typeof _sizes;
}

const Component = ({ label, style, children, ...rest }: Props) => (
  <Pressable style={style} {...rest}>
    {children ? children : <Text style={{ textAlign: 'center' }}>{label}</Text>}
  </Pressable>
);

export const Button = styled(Component)<Omit<Props, 'label'>>`
  all: unset;
  ${(props) => _variants[props.variant]};
  ${(props) => _sizes[props.size]};
  cursor: pointer;
  &:hover {
    background: #ba7da2dd;
  }
`;


