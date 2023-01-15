import styled, { css } from 'styled-components/native';

export const StyledInput = styled.TextInput<{
  hasFocus: boolean;
  isDisabled: boolean;
}>`
  flex: 1;
  padding: 16px;
  border: 2px solid ${(props) => props.theme.colours.neutrals.dark};
  border-radius: 4px;
  ${(props) =>
    props.hasFocus && `border-color: ${props.theme.colours.primary.P300}`}
`;
