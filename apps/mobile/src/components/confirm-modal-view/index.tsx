import { Dimensions, Modal, View } from 'react-native';
import { FC } from 'react';
import { ActionsContainer, Container, Overlay } from './styles';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

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
        <View className={cn("px-4")}>
          <Text className="text-2xl font-semibold tracking-tight">{title}</Text>
          <View className="h-2" />
          <Text>{message}</Text>
        </View>
        <View className="h-8" />
        <ActionsContainer>
          <Button
            onPress={onCancel}
            size="default"
            variant="ghost"
          >
            <Text>{cancelText}</Text>
          </Button>
          <View className="w-8" />
          <Button
            onPress={onConfirm}
            size="default"
            variant="destructive"
          >
            <Text>{confirmText}</Text>
          </Button>
        </ActionsContainer>
      </Container>
    </Modal>
  );
};
