import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import { Avatar as Av } from '../../atoms/avatar';

export const Container = styled(Pressable)`
  padding: ${(props) => props.theme.sizes.extraLarge}px 16px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const AddTodoButton = styled(Pressable)`
  border-radius: ${(props) => props.theme.sizes.big * 9000}px;
  justify-content: center;
  padding: 14px 16px;
  background-color: ${(props) => props.theme.colours.neutrals.white};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
`;

export const FunnyBadge = styled.View`
  width: 229.37px;
  height: 134.15px;
  position: absolute;
  border-radius: 24px;
  background: ${({ theme: { colours } }) => colours.primary.P300};
  top: -75px;
  left: -30px;
  transform: rotate(-9deg);
`;

export const Avatar = styled(Av)`
  width: 48px;
  height: 48px;
  border-radius: 8px;
`;
