import styled, { css } from 'styled-components/native';
import { Text } from '../typography';

export const _variants = (isPressed: boolean) => ({
  primary: css`
    background: ${(props) =>
      isPressed
        ? props.theme.colours.primary.P500
        : props.theme.colours.primary.P300};
  `,
  secondary: css`
    background: ${(props) =>
      isPressed
        ? props.theme.colours.primary.P75
        : props.theme.colours.primary.P50};
  `,
  tertiary: css``,
  danger: css`
    background: ${(props) =>
      isPressed
        ? props.theme.colours.danger.D500
        : props.theme.colours.danger.D300};
  `,
  disabled: css`
    background: ${(props) => props.theme.colours.greys.G50};
  `,
});

export const _sizes = {
  sm: css`
    padding: ${(props) => props.theme.sizes.small}px;
    border-radius: ${(props) => props.theme.sizes.small / 4}px;
  `,
  md: css`
    padding: 12px 16px;
    border-radius: ${(props) => props.theme.sizes.small / 4}px;
  `,
  lg: css`
    padding: 16px 24px;
    border-radius: 4px;
  `,
};

const labelFontSize = (variant: 'lg' | 'md' | 'sm') => {
  switch (variant) {
    case 'sm':
      return css`
        font-size: 8px;
      `;
    case 'lg':
      return css`
        font-size: 16px;
      `;
    case 'md':
      return css`
        font-size: 12px;
      `;
    default:
      return css`
        font-size: 14px;
      `;
  }
};

const labelFontColor = {
  primary: css`
    color: ${(props) => props.theme.colours.neutrals.white};
  `,
  secondary: css`
    color: ${(props) => props.theme.colours.primary.P300};
  `,
  tertiary: css`
    color: ${(props) => props.theme.colours.primary.P300};
  `,
  danger: css`
    color: ${(props) => props.theme.colours.neutrals.white};
  `,
  disabled: css`
    color: ${(props) => props.theme.colours.greys.G75};
  `,
};

export const Label = styled(Text)<{
  labelSize: keyof typeof _sizes;
  labelColor: keyof ReturnType<typeof _variants>;
}>`
  text-align: center;
  ${(props) => labelFontColor[props.labelColor]};
  ${(props) => labelFontSize(props.labelSize)};
`;
