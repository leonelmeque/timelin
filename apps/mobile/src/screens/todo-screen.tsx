import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { api, TodoProps } from '@todo/commons';
import { Header, Spacer, Text } from '@todo/mobile-ui';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { CustomSafeAreaView } from '../components/safe-area-view';
import { MaterialIcons } from '@expo/vector-icons';
import { TodoView } from '../components/todo-view';

type AddTodoScreenProps = {
  Params: {
    todo: TodoProps;
  };
};

const TodoScreen = () => {
  const navigation = useNavigation();

  const { params } = useRoute<RouteProp<AddTodoScreenProps>>();

  const onPressDeleteTodo = (id: string) => (e: GestureResponderEvent) => {
    api.todo
      .deleteTodo(id)
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const renderTodoActions = () => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Pressable>
        <MaterialIcons name="ios-share" size={24} />
      </Pressable>
      <Spacer size="8" />
      <Pressable onPress={onPressDeleteTodo(params.todo.id)}>
        <MaterialIcons name="delete-outline" size={24} />
      </Pressable>
    </View>
  );

  return (
    <CustomSafeAreaView>
      <Header
        renderLeftContent={() => (
          <Pressable onPress={() => navigation.goBack()}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="arrow-back" size={24} />
              <Spacer size="4" />
              <Text size="body" weight="medium">
                Back
              </Text>
            </View>
          </Pressable>
        )}
        renderRigthContent={renderTodoActions}
      />
      {params.todo ? (
        <TodoView todo={params.todo} />
      ) : (
        <Text size="small">Todo not found</Text>
      )}
    </CustomSafeAreaView>
  );
};

export default TodoScreen;
