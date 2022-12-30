import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'
import AddTodoScreen from '../screens/add-todo-screen'
import TodosScreen from '../screens/list-todo-screen'

const Stack = createNativeStackNavigator()

const options: NativeStackNavigationOptions = {
  headerShown: false,
}

const TodoListStack = () => (
  <Stack.Navigator screenOptions={options}>
    <Stack.Screen component={TodosScreen} name="TodoList" />
    <Stack.Screen
      component={AddTodoScreen}
      name="AddTodo"
      options={{ headerTitle: 'Add Todo', headerShown: true }}
    />
  </Stack.Navigator>
)

export default TodoListStack
