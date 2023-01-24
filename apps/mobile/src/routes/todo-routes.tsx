import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'
import AddTodoScreen from '../screens/add-todo-screen'
import HomeScreen from '../screens/home-screen';
import { ListTodoScreen } from '../screens/list-todo-screen';
import { SearchScreen } from '../screens/search-screen';

const Stack = createNativeStackNavigator();

const options: NativeStackNavigationOptions = {
  headerShown: false,
};

const TodoListStack = () => (
  <Stack.Navigator screenOptions={options}>
    <Stack.Screen component={HomeScreen} name="TodoList" />
    <Stack.Screen
      component={ListTodoScreen}
      name="Todo/ListTodo"
      options={{ headerShown: false }}
    />
    <Stack.Screen
      component={SearchScreen}
      name="Todo/Search"
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default TodoListStack
