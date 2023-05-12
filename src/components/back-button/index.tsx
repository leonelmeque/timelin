import { MaterialIcons } from '@expo/vector-icons';
import { GestureResponderEvent } from 'react-native';
import { Spacer, Text } from '../../ui/atoms';
import styled from 'styled-components/native';
import { FC } from 'react';

const StyledBackButton = styled.Pressable`
  align-items: center;
  flex-direction: row;
`;

type BackButtonProps = {
  colour: string;
  onPress: (e: GestureResponderEvent) => void;
  text: string;
};

export const LeftArrowWithTextButton: FC<BackButtonProps> = ({
  onPress,
  colour,
  text,
}) => (
  <StyledBackButton onPress={onPress}>
    <MaterialIcons name="arrow-back" size={24} color={colour} />
    <Spacer size="4" />
    <Text size="body" weight="bold" colour={colour}>
      {text}
    </Text>
  </StyledBackButton>
);
