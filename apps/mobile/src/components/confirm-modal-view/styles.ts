import { Box } from '@todo/mobile-ui';
import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: auto;
  background-color: ${(props) => props.theme.colours.neutrals.white};
  padding-top: ${(props) => props.theme.spacing.size32}px;
  padding-bottom: ${(props) => props.theme.spacing.size64}px;
  border-top-right-radius: ${props => props.theme.spacing.size32}px; 
  border-top-left-radius: ${props => props.theme.spacing.size32}px; 
`;

export const Overlay = styled.View<{
  width?: number;
  height?: number;
}>`
  background-color: ${(props) => props.theme.colours.greys.G500};
  opacity: 0.1;
  position: absolute;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

export const ActionsContainer = styled(Box)`
  flex-direction: row;
  align-self: flex-end;
`;
