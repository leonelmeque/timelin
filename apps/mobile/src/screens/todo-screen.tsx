import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { api, TodoProps } from '@todo/commons';
import { Header, Spacer, Text } from '@todo/mobile-ui';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { CustomSafeAreaView } from '../components/safe-area-view';
import { MaterialIcons } from '@expo/vector-icons';
import { TodoView } from '../components/todo-view';
import { useFetchTodo, useUpdateTodos } from '@todo/store';
import { HeaderActions } from '../components/header-actions';

type AddTodoScreenProps = {
  Params: {
    todo: TodoProps;
  };
};

const TodoScreen = () => {
  const navigation = useNavigation();
  const { handleDeleteTodoAtom } = useUpdateTodos();
  const { params } = useRoute<RouteProp<AddTodoScreenProps>>();

  const {
    value: [state],
    resetCacheData,
  } = useFetchTodo(params.todo.id);

  const onPressDeleteTodo =
    (id: string) => async (e: GestureResponderEvent) => {
      try {
        await api.todo.deleteTodo(id);
        handleDeleteTodoAtom(id);
        navigation.goBack();
      } catch (error) {
        alert((error as Error).message);
      }
    };


  return (
    <CustomSafeAreaView>
      <Header
        renderLeftContent={() => (
          <Pressable
            onPress={() => {
              resetCacheData();
              navigation.goBack();
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="arrow-back" size={24} />
              <Spacer size="4" />
              <Text size="body" weight="medium">
                Back
              </Text>
            </View>
          </Pressable>
        )}
        renderRigthContent={() => (
          <HeaderActions onPressDelete={onPressDeleteTodo(params.todo.id)} />
        )}
      />

      {state.state === 'loading' ? (
        <Text size="body">Loading....</Text>
      ) : (
          <TodoView todo={(state as typeof state & { data: any })?.data} />
      )}
    </CustomSafeAreaView>
  );
};

export default TodoScreen;
