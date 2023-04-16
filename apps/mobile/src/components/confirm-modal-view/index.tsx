import { Box, Button, Spacer, Text } from '@todo/mobile-ui';
import { Dimensions, Modal } from 'react-native';
import { FC } from 'react';
import { ActionsContainer, Container, Overlay } from './styles';

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
            label="Cancel"
            size="md"
            variant="tertiary"
          />
          <Spacer size="16" />
          <Button
            onPress={onConfirm}
            label="Yes, Delete Task"
            size="md"
            variant="danger"
          />
        </ActionsContainer>
      </Container>
    </Modal>
  );
};
