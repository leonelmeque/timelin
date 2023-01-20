import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'
import AddTodoScreen from '../screens/add-todo-screen'
import TodosScreen from '../screens/list-todo-screen'
import { SearchScreen } from '../screens/search-screen';

const Stack = createNativeStackNavigator()

const options: NativeStackNavigationOptions = {
  headerShown: false,
}

const TodoListStack = () => (
  <Stack.Navigator screenOptions={options}>
    <Stack.Screen component={TodosScreen} name="TodoList" />
    <Stack.Screen
      component={AddTodoScreen}
      name="Todo/Main"
      options={{ headerTitle: 'Add Todo', headerShown: true }}
    />
    <Stack.Screen
      component={SearchScreen}
      name="Todo/Search"
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default TodoListStack
