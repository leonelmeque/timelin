import { View } from 'react-native';
import { tokens } from '@todo/commons';
import styled from 'styled-components/native';

export const BadgeContainer = styled.View`
  position: absolute;
  right: 0;
  top: -16px;
`;

export const TodoCardContainer = styled(View)<{
  cardColor?: keyof typeof tokens.colours.light.todoPalette;
}>`
  padding: ${(props) => props.theme.sizes.medium}px;
  background-color: ${(props) =>
    !props.cardColor
      ? props.theme.colours.primary.P100
      : props.theme.colours.todoPalette[props.cardColor]};
  border-radius: ${(props) => props.theme.sizes.small / 2}px;
  box-shadow: ${({ theme: { shadow } }) => shadow.L3};
`;
