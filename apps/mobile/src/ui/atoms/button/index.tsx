import React from 'react';
import styled from 'styled-components/native';
import { PressableProps, Pressable, View, ViewProps } from 'react-native';
import { Label, _sizes, _variants } from './styles';

export interface ButtonProps extends ViewProps {
  label?: string;
  variant: keyof ReturnType<typeof _variants>;
  size: keyof typeof _sizes;
  pressed?: boolean;
  isLoading?: boolean;
}

export const Button = ({
  label,
  children,
  variant,
  size,
  style,
  isLoading,
  ...rest
}: ButtonProps & PressableProps) => (
  <Pressable {...rest} disabled={isLoading || rest.disabled}>
    {({ pressed }) => (
      <StyledButton
        style={style}
        variant={variant}
        size={size}
        pressed={pressed}
      >
        {children ? (
          children
        ) : (
          <Label
            size="body"
            weight="bold"
            labelSize={size}
            labelColor={variant}
          >
            {isLoading ? "Loading..." : label}
          </Label>
        )}
      </StyledButton>
    )}
  </Pressable>
);

const StyledButton = styled.View<ButtonProps>`
  all: unset;
  ${(props) => _variants(props.pressed || false)[props.variant]};
  ${(props) => _sizes[props.size]};
  cursor: pointer;
`;
