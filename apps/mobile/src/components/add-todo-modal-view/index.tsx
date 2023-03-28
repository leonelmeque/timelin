import { useNavigation } from '@react-navigation/native';
import { api, TodoProps } from '@todo/commons';
import { Box, Button, Palette, PlainTextInput, Spacer } from '@todo/mobile-ui';
import { useUpdateTodos } from '@todo/store';
import { readWriteTodosAtom } from '@todo/store';
import { useSetAtom } from 'jotai';
import { FC, useRef, useState } from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useUserContext } from '../../context';
import { CustomSafeAreaView } from '../safe-area-view';

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
      status: 'TODO',
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
      await api.users.updateTodoList(user?.id as string, [
        ...(user?.todos as string[]),
        data.result.id,
      ]);

      handleAddTodoAtom(data.result);

      onModalDismiss(e);
      onChangeText('');
      setTimeout(() => {
        /**
         * TODO: fix this TS error
         *
         */
        //  @ts-ignore
        navigation.navigate('Todo/Add', {
          todo: data.result,
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
          <Box
            style={{
              backgroundColor: Palette.greys.G300,
              opacity: 0.2,
              position: 'absolute',
              height: Dimensions.get('screen').height,
              width: Dimensions.get('screen').width,
            }}
          />
        </TouchableWithoutFeedback>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            backgroundColor: Palette.neutrals.white,
            justifyContent: 'flex-end',
            marginTop: 'auto',

            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}
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
        </KeyboardAvoidingView>
      </CustomSafeAreaView>
    </Modal>
  );
};
