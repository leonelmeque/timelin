import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useCustomModal } from '../context';
import AddTodoScreen from '../screens/add-todo-screen';
import TodoListStack from './todo-routes';

const Tab = createBottomTabNavigator();

export function Tabs() {
  const [, dispatch] = useCustomModal();

  return (
    <Tab.Navigator
      initialRouteName="Todo/Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Todo/Home" component={TodoListStack} />
      <Tab.Screen
        name="Todo/Add"
        component={AddTodoScreen}
        options={{
          tabBarStyle: { display: 'none' },
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            dispatch(true);
          },
        }}
      />
    </Tab.Navigator>
  );
}
