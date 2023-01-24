import { View } from 'react-native';
import { tokens } from '@todo/commons';
import styled from 'styled-components/native';

export const BadgeContainer = styled.View``;

export const AvatarsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: auto;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const TodoCardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TodoCardContent = styled.View``;

export const TodoCardContainer = styled(View)<{
  cardColor?: keyof typeof tokens.colours.light.todoPalette;
}>`
  flex: 1;
  padding: 24px 16px;
  background-color: ${(props) =>
    !props.cardColor
      ? props.theme.colours.primary.P100
      : props.theme.colours.todoPalette[props.cardColor]};
  border-radius: 20px;
`;
