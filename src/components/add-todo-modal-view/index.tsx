import { useNavigation } from '@react-navigation/native';
import { FC, useRef, useState } from 'react';
import { Modal, TouchableWithoutFeedback, Platform } from 'react-native';
import { useUserContext } from '../../context';
import { CustomSafeAreaView } from '../safe-area-view';
import { ModalOverLay, StyledKeyboardAvoidingView } from './styles';
import { useUpdateTodos } from '../../store';
import { TodoProps, TodoStatus, api } from '../../lib';
import { Box, Button, Palette, PlainTextInput, Spacer } from '../../ui/atoms';

type AddTodoModalViewProps = {
  visibility: boolean;
  onModalDismiss: (args: any) => void;
};

export const AddTodoModalView: FC<AddTodoModalViewProps> = ({
  visibility,
  onModalDismiss,
}) => {
  const [todoName, setTodoName] = useState('');
  const withDescriptionRef = useRef(false);
  const [user] = useUserContext();
  const navigation = useNavigation();
  const { handleAddTodoAtom } = useUpdateTodos();

  const onChangeText = (value: string) => {
    setTodoName(value);
  };

  const prepareData = (name: string, creator: string): TodoProps => {
    const randomPalette = parseInt((Math.random() * 5).toFixed(0));

    return {
      todo: name,
      description: '',
      status: TodoStatus.TODO,
      //@ts-ignore
      timestamp: Date.now(),
      color: Object.keys(Palette.todoPalette).map((key) => key)[randomPalette],
      participants: [],
      endDate: '',
      startDate: '',
      creator: creator,
    };
  };

  const onPressSave = async (e: any) => {
    const todo = prepareData(todoName, user?.id as string);
    try {
      const data = await api.todo.createTodo(todo);

      handleAddTodoAtom(data);

      onModalDismiss(e);
      onChangeText('');
      setTimeout(() => {
        /**
         * TODO: fix this TS error
         *
         */
        //  @ts-ignore
        navigation.navigate('Todo/Add', {
          todo: data,
          autofocusDescription: withDescriptionRef.current,
        });
      }, 1000);
    } catch (error) {
      // Notification Error
      console.error(error);
    }
  };

  return (
    <Modal visible={visibility} transparent>
      <CustomSafeAreaView style={{ backgroundColor: 'transparent' }}>
        <TouchableWithoutFeedback onPress={onModalDismiss}>
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
              placeholder="What is the task about?"
              value={todoName}
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
              {!!todoName && (
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
                variant={!todoName ? 'disabled' : 'primary'}
                onPress={onPressSave}
                disabled={!todoName}
              />
            </Box>
          </Box>
        </StyledKeyboardAvoidingView>
      </CustomSafeAreaView>
    </Modal>
  );
};
