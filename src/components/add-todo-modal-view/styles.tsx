import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Box, Palette } from '../../ui/atoms';

export const ModalOverLay = styled(Box)`
  background-color: ${Palette.greys.G300};
  opacity: 0.2;
  position: absolute;
  height: ${Dimensions.get('screen').height}px;
  width: ${Dimensions.get('screen').width}px;
`;

export const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  background-color: ${Palette.neutrals.white};
  justify-content: flex-end;
  margin-top: auto;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;
