import { Dimensions, Modal } from 'react-native';
import { FC } from 'react';
import { ActionsContainer, Container, Overlay } from './styles';
import { Box, Spacer, Button, Text } from '../../ui/atoms';

interface ConfirmModalViewProps {
  title: string;
  message: string;
  visible: boolean;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModalView: FC<ConfirmModalViewProps> = ({
  title,
  message,
  visible,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal visible={visible} transparent>
      <Overlay
        onTouchEndCapture={onCancel}
        width={Dimensions.get('screen').width}
        height={Dimensions.get('screen').height}
      />
      <Container>
        <Box>
          <Text size="heading">{title}</Text>
          <Spacer size="4" />
          <Text size="body">{message}</Text>
        </Box>
        <Spacer size="16" />
        <ActionsContainer>
          <Button
            onPress={onCancel}
            label={cancelText}
            size="md"
            variant="tertiary"
          />
          <Spacer size="16" />
          <Button
            onPress={onConfirm}
            label={confirmText}
            size="md"
            variant="danger"
          />
        </ActionsContainer>
      </Container>
    </Modal>
  );
};
