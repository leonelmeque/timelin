import { MaterialIcons } from '@expo/vector-icons';
import { Spacer } from '@todo/mobile-ui';
import { GestureResponderEvent, Pressable } from 'react-native';
import { Container } from './styles';
import { FC } from 'react';

type HeaderActionsProps = {
  onPressDelete?: (e: GestureResponderEvent) => void;
  onPressShare?: (e: GestureResponderEvent) => void;
};

export const HeaderActions: FC<HeaderActionsProps> = ({
  onPressDelete,
  onPressShare,
}) => {
  return (
    <Container>
      <Pressable onPress={onPressShare}>
        <MaterialIcons name="ios-share" size={24} />
      </Pressable>
      <Spacer size="8" />
      <Pressable onPress={onPressDelete}>
        <MaterialIcons name="delete-outline" size={24} />
      </Pressable>
    </Container>
  );
};
