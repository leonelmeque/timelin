import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useCustomModal } from '../context';
import TodoScreen from '../screens/todo-screen';
import TodoListStack from './todo-routes';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ route, color }: { route: string; color: string }) => {
  switch (route) {
    case 'Todo/Home':
      return <MaterialIcons name="bookmark-border" size={24} color={color} />;
    case 'Todo/Add':
      return (
        <MaterialIcons name="add-circle-outline" size={24} color={color} />
      );
    default:
      return <MaterialIcons name="logout" />;
  }
};

const DummyComponent = () => <></>;

export function Tabs() {
  const [, dispatch] = useCustomModal();

  return (
    <Tab.Navigator
      initialRouteName="Todo/Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Todo/Home"
        component={TodoListStack}
        options={({ route }) => ({
          tabBarStyle: ((route: any) => {
            const routeName = getFocusedRouteNameFromRoute(route);

            if (
              routeName === 'Todo/View' ||
              routeName === 'Todo/Search' ||
              routeName === 'Todo/ListTodo' ||
              routeName === 'Todo/Timeline'
            ) {
              return { display: 'none', backgroundColor: 'white' };
            }

            return;
          })(route),
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon route={route.name} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="Todo/Add"
        component={TodoScreen}
        options={({ route }) => ({
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon route={route.name} color={color} />
          ),
        })}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            dispatch(true);
          },
        }}
      />
      <Tab.Screen
        name="Todo/Settings"
        component={DummyComponent}
        options={({ route }) => ({
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon route={route.name} color={color} />
          ),
        })}
        listeners={{
          tabPress: async (e) => {
            e.preventDefault();
          },
        }}
      />
    </Tab.Navigator>
  );
}
