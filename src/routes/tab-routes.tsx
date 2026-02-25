import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useCustomModal } from '../context';
import TodoScreen from '../screens/todo-screen';
import TodoListStack from './todo-routes';
import { HideTabBarNavigation } from './constants';
import SettingsStack from './settings.routes';
import { FloatingToolbar } from '../components/floating-toolbar';

const Tab = createBottomTabNavigator();

export function Tabs() {
  const [, dispatch] = useCustomModal();

  return (
    <Tab.Navigator
      initialRouteName="Todo/Home"
      tabBar={(props) => <FloatingToolbar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tab.Screen
        name="Todo/Home"
        component={TodoListStack}
        options={({ route }) => ({
          tabBarStyle: ((route: any) => {
            const routeName = getFocusedRouteNameFromRoute(route);

            if (
              HideTabBarNavigation[
              routeName as keyof typeof HideTabBarNavigation
              ]
            ) {
              return { display: 'none' };
            }

            return;
          })(route),
        })}
      />
      <Tab.Screen
        name="Todo/Add"
        component={TodoScreen}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            dispatch(true);
          },
        }}
      />
      <Tab.Screen
        name="Todo/Settings"
        component={SettingsStack}
      />
    </Tab.Navigator>
  );
}
