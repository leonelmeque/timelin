import { useNavigation } from '@react-navigation/native';
import { TodoProps } from '@todo/commons';
import { Button, Palette, Spacer } from '@todo/mobile-ui';
import { FC, useState } from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { todosAPI } from '../../utils/backend';
import { generateId } from '../../utils/uiUtils';
import Box from '../atoms/Layout/Layout';
import { PlainTextInput } from '../plain-input';
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
  const navigation = useNavigation();

  const onChangeText = (value: string) => {
    setTodoName(value);
  };

  const prepareData = (): TodoProps => {
    const randomPalette = parseInt((Math.random() * 5).toFixed(0));
    const id = generateId();
    return {
      todo: todoName,
      description: '',
      status: 'todo',
      id,
      //@ts-ignore
      timestamp: Date.now(),
      color: Object.keys(Palette.todoPalette).map((key) => key)[randomPalette],
      assigned: [],
    };
  };

  const onPressAddDescription = (e: any) => {
    const todo = prepareData();

    todosAPI
      .postTodos(todo)
      .then(() => {
        onChangeText('');
        onModalDismiss(e);
        setTimeout(() => {
          navigation.navigate<string>('Todo/Add', {
            todo,
            autofocusDescription: true,
          });
        }, 1000);
      })
      .catch(() => {
        //Notification Error
      });
  };

  const onPressSave = (e: any) => {
    const todo = prepareData();

    todosAPI
      .postTodos(todo)
      .then(() => {
        onModalDismiss(e);
        onChangeText('');
        setTimeout(() => {
          navigation.navigate<string>('Todo/Add', {
            todo,
            autofocusDescription: false,
          });
        }, 1000);
      })
      .catch(() => {
        //Notification with error
      });
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
              {todoName && (
                <Button
                  label="Add description"
                  size="md"
                  variant="tertiary"
                  onPress={onPressAddDescription}
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
