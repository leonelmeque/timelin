import {

  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import TodoScreen from '../screens/todo-screen';
import HomeScreen from '../screens/home-screen';
import { ListTodoScreen } from '../screens/list-todo-screen';
import { SearchScreen } from '../screens/search-screen';
import TimelineStack from './timeline.routes';
import { Stack } from './constants';

const options: NativeStackNavigationOptions = {
  headerShown: false,
};

const TodoListStack = () => (
  <Stack.Navigator screenOptions={options}>
    {/* Todo Screen Group */}
    <Stack.Group>
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
      <Stack.Screen
        component={TodoScreen}
        name="Todo/View"
        options={{ headerShown: false }}
      />
    </Stack.Group>
    {/* Timeline Screen Group */}
    {TimelineStack()}
  </Stack.Navigator>
);

export default TodoListStack;
