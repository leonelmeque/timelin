import { useRouter } from 'expo-router';
import { FC, useRef, useState } from 'react';
import { Modal, TouchableWithoutFeedback, Platform, View, TextInput } from 'react-native';
import { useUserContext } from '../../context';
import { CustomSafeAreaView } from '../safe-area-view';
import { ModalOverLay, StyledKeyboardAvoidingView } from './styles';
import { useUpdateTodos } from '../../store';
import { TodoProps, TodoStatus, api } from '../../lib';

import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

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
  const router = useRouter();
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
      color: ['blue', 'green', 'orange', 'pink', 'yellow'][randomPalette],
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
        router.push(`/todo/${data.id}`);
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
          <View
            className={cn("px-4 pt-3 pb-3")}
          >
            <TextInput
              className={cn("py-3 border border-transparent text-sm")}
              style={{ fontWeight: '500' }}
              placeholder="What is the task about?"
              value={todoName}
              onChangeText={onChangeText}
              autoFocus
            />
            <View className="h-2" />
            <View
              className={cn("px-4 flex-row justify-end")}
            >
              {!!todoName && (
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
                disabled={!todoName}
              >
                <Text>save</Text>
              </Button>
            </View>
          </View>
        </StyledKeyboardAvoidingView>
      </CustomSafeAreaView>
    </Modal>
  );
};
