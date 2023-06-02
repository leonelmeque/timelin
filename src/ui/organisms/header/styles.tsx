import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import { Avatar as Av } from '../../atoms/avatar';

export const Container = styled(Pressable)`
  padding: 4px ${(props) => props.theme.sizes.extraLarge}px 16px 16px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const HeaderLeftContent = styled.View`
  justify-content: flex-start;
`;

export const HeaderMiddleContent = styled.View`
  justify-content: center;
`;

export const HeaderRightContent = styled.View`
  justify-content: flex-end;
`;

