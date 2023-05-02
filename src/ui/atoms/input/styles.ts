import styled, { css } from 'styled-components/native';

export enum InputVariant {
  DEFAULT = 'default',
  FOCUS = 'hasFocus',
  DISABLED = 'isDisabled',
  ERROR = 'hasError',
  SUCCESS = 'isSuccessful',
}

const defaultState = css`
  border-color: ${(props) => props.theme.colours.neutrals.dark};
`;

const hasFocus = css`
  border-color: ${(props) => props.theme.colours.primary.P300};
`;

const hasError = css`
  border-color: ${(props) => props.theme.colours.danger.D300};
`;

const isDisabled = css`
  border-color: ${(props) => props.theme.colours.greys.G50};
  background: ${(props) => props.theme.colours.greys.G50};
`;

const success = css`
  border-color: ${(props) => props.theme.colours.success.S300};
`;

const getInputVariant = (op: InputVariant) => {
  switch (op) {
    case InputVariant.DEFAULT:
      return defaultState;
    case InputVariant.DISABLED:
      return isDisabled;
    case InputVariant.ERROR:
      return hasError;
    case InputVariant.FOCUS:
      return hasFocus;
    case InputVariant.SUCCESS:
      return success;
    default:
      return defaultState;
  }
};

export const StyledInput = styled.TextInput<{
  variant: InputVariant;
}>`
  width: 100%;
  padding: 16px;
  border: 1.35px solid ${(props) => props.theme.colours.neutrals.dark};
  border-radius: 4px;
  ${(props) => getInputVariant(props.variant)};
`;
