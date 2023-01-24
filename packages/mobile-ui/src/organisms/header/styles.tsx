import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import { Avatar as Av } from '../../atoms/avatar';

export const Container = styled(Pressable)`
  padding: ${(props) => props.theme.sizes.extraLarge}px 16px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const HeaderLeftContent = styled.View`
  order: 1;
  justify-content: flex-start;
`;

export const HeaderMiddleContent = styled.View`
  order: 2;
  justify-content: center;
`;

export const HeaderRightContent = styled.View`
  order: 3;
  justify-content: flex-end;
`;

