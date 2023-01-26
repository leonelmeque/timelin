import styled from 'styled-components/native';

export const PlainTextInput = styled.TextInput<{
  weight: '400' | '500' | '600' | '700';
  size: 'large' | 'body';
}>`
  padding: 12px 0px;
  font-size: ${(props) =>
    props.size === 'body' ? 14 : props.theme.spacing.size24}px;
  font-weight: ${(props) => Number(props.weight)};
  border: 1px solid transparent;
`;
