import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { FC, useRef, useState } from 'react';
import { TouchableWithoutFeedback, Platform } from 'react-native';
import { useUserContext } from '../../context';
import { CustomSafeAreaView } from '../safe-area-view';
import { ModalOverLay, StyledKeyboardAvoidingView } from './styles';
import { TimelineEventProps, api } from '../../lib';
import { useTimeline } from '../../store';
import { Box, PlainTextInput, Spacer, Button } from '../../ui/atoms';



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
  const navigation = useNavigation();
  const {
    params: { todoUID },
  } = useRoute<RouteProp<{ params: { todoUID: string } }>>();
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
        navigation.goBack();
        //  @ts-ignore
        navigation.navigate('Timeline/Event', {
          event: data,
          todoUID,
          autofocusDescription: withDescriptionRef.current,
        });
      }, 300);
    } catch (error) {
      // Notification Error
      console.error(error);
    }
  };

  return (
    // <Modal visible={visibility} transparent>
    <CustomSafeAreaView style={{ backgroundColor: 'transparent' }}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <ModalOverLay />
      </TouchableWithoutFeedback>
      <StyledKeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Box
          style={{
            paddingTop: 12,
            paddingBottom: 12,
          }}
        >
          <PlainTextInput
            size="body"
            weight="500"
            placeholder="What is the event name?"
            value={eventName}
            onChangeText={onChangeText}
            autoFocus
          />
          <Spacer size="4" />
          <Box
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            {!!eventName && (
              <Button
                label="Add description"
                size="md"
                variant="tertiary"
                onPress={(e) => {
                  withDescriptionRef.current = true;
                  onPressSave(e);
                }}
              />
            )}
            <Button
              label="save"
              size="md"
              variant={!eventName ? 'disabled' : 'primary'}
              onPress={onPressSave}
              disabled={!eventName}
            />
          </Box>
        </Box>
      </StyledKeyboardAvoidingView>
    </CustomSafeAreaView>
    // </Modal>
  );
};
