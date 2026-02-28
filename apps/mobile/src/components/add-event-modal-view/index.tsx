import { useRouter, useLocalSearchParams } from 'expo-router';
import { FC, useRef, useState } from 'react';
import { TouchableWithoutFeedback, Platform, View, TextInput } from 'react-native';
import { useUserContext } from '../../context';
import { CustomSafeAreaView } from '../safe-area-view';
import { ModalOverLay, StyledKeyboardAvoidingView } from './styles';
import { TimelineEventProps, api } from '../../lib';
import { useTimeline } from '../../store';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';



type AddTodoModalViewProps = {
  visibility?: boolean;
  onModalDismiss?: (args: any) => void;
};

export const AddEventModalView: FC<AddTodoModalViewProps> = ({
  visibility,
  onModalDismiss,
}) => {
  const [eventName, setEventName] = useState('');
  const withDescriptionRef = useRef(false);
  const [user] = useUserContext();
  const router = useRouter();
  const { id: todoUID } = useLocalSearchParams<{ id: string }>();
  const { handleAddTimeline } = useTimeline();

  const onChangeText = (value: string) => {
    setEventName(value);
  };

  const prepareData = (name: string, creator: string): TimelineEventProps => ({
    title: name,
    description: '',
    timestamp: `${Date.now()}`,
    creator,
    participants: [],
  });

  const onPressSave = async (e: any) => {
    const event = prepareData(eventName, user?.id as string);
    try {
      const data = await api.timeline.addTimelineEvent(todoUID, event);

      handleAddTimeline(data);

      onModalDismiss && onModalDismiss(e);

      setTimeout(() => {
        onChangeText('');
        router.back();
        router.push(`/timeline/${todoUID}/event/${data.id}`);
      }, 300);
    } catch (error) {
      // Notification Error
      console.error(error);
    }
  };

  return (
    // <Modal visible={visibility} transparent>
    <CustomSafeAreaView style={{ backgroundColor: 'transparent' }}>
      <TouchableWithoutFeedback onPress={() => router.back()}>
        <ModalOverLay />
      </TouchableWithoutFeedback>
      <StyledKeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View
          className={cn("px-4 pt-3 pb-3")}
        >
          <TextInput
            className={cn("py-3 border border-transparent text-sm")}
            style={{ fontWeight: '500' }}
            placeholder="What is the event name?"
            value={eventName}
            onChangeText={onChangeText}
            autoFocus
          />
          <View className="h-2" />
          <View
            className={cn("px-4 flex-row justify-end")}
          >
            {!!eventName && (
              <Button
                size="default"
                variant="ghost"
                onPress={(e) => {
                  withDescriptionRef.current = true;
                  onPressSave(e);
                }}
              >
                <Text>Add description</Text>
              </Button>
            )}
            <Button
              size="default"
              variant="default"
              onPress={onPressSave}
              disabled={!eventName}
            >
              <Text>save</Text>
            </Button>
          </View>
        </View>
      </StyledKeyboardAvoidingView>
    </CustomSafeAreaView>
    // </Modal>
  );
};
