import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import TodoScreen from "../screens/todo-screen";
import { ListTodoScreen } from "../screens/list-todo-screen";
import { SearchScreen } from "../screens/search-screen";
import TimelineStack from "./timeline.routes";
import { Stack } from "./constants";
import { Tabs } from "./tab-routes";

const options: NativeStackNavigationOptions = {
  headerShown: false,
};

const TodoListStack = () => (
  <Stack.Navigator screenOptions={options}>
    {/* Todo Screen Group */}
    <Stack.Group screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Tabs} name="TodoList" />
      <Stack.Screen component={ListTodoScreen} name="Todo/ListTodo" />
      <Stack.Screen component={SearchScreen} name="Todo/Search" />
      <Stack.Screen component={TodoScreen} name="Todo/View" />
    </Stack.Group>
    {/* Timeline Screen Group */}
    {TimelineStack()}
  </Stack.Navigator>
);

export default TodoListStack;
