import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useCustomModal } from '../context';
import TodoScreen from '../screens/todo-screen';
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
      <Tab.Screen
        name="Todo/Home"
        component={TodoListStack}
        options={({ route }) => ({
          tabBarStyle: ((route: any) => {
            const routeName = getFocusedRouteNameFromRoute(route);

            if (routeName === 'Todo/View') {
              return { display: 'none', backgroundColor: 'white' };
            }

            return;
          })(route),
        })}
      />
      <Tab.Screen
        name="Todo/Add"
        component={TodoScreen}
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
