import { PressableProps } from 'react-native';
import { css } from 'styled-components/native';

export interface Props extends PressableProps {
  label: string;
  variant: keyof typeof _variants;
  size: keyof typeof _sizes;
}

export const _variants = {
  primary: css`
    background: ${(props) => props.theme.colours.primary.P500};
    color: ${(props) => props.theme.colours.neutrals.white};
  `,
  secondary: css`
    background: ${(props) => props.theme.colours.primary.P300};
    color: ${(props) => props.theme.colours.neutrals.dark};
  `,
  tertiary: css``,
  danger: css`
    background-color: ${(props) => props.theme.colours.danger.D300};
    color: ${(props) => props.theme.colours.neutrals.white};
  `,
};

export const _sizes = {
  sm: css`
    font-size: ${(props) => props.theme.typography.sizes.small}px;
    padding: ${(props) => props.theme.sizes.small}px;
    border-radius: ${(props) => props.theme.sizes.small / 2}px;
  `,
  md: css`
    font-size: ${(props) => props.theme.typography.sizes.body}px;
    padding: ${(props) => props.theme.sizes.medium}px;
    border-radius: ${(props) => props.theme.sizes.medium / 2}px;
  `,
  lg: css`
    font-size: ${(props) => props.theme.typography.sizes.large};
    padding: 24px 16px;
    border-radius: 4px;
  `,
};
