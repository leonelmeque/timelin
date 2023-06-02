import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useCustomModal } from "../context";
import { MaterialIcons } from "@expo/vector-icons";
import SettingsStack from "./settings.routes";
import HomeScreen from "../screens/home-screen";

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ route, color }: { route: string; color: string }) => {
  switch (route) {
    case "Todo/Home":
      return <MaterialIcons name="bookmark-border" size={24} color={color} />;
    case "Todo/Add":
      return (
        <MaterialIcons name="add-circle-outline" size={24} color={color} />
      );
    case "Todo/Settings":
      return <MaterialIcons name="settings" size={24} color={color} />;
    default:
      return <MaterialIcons name="logout" />;
  }
};

const DummyComponent = () => <></>

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
        component={HomeScreen}
        options={({ route }) => ({
          tabBarIcon: ({ color }) => (
            <TabBarIcon route={route.name} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="Todo/Add"
        component={DummyComponent}
        options={({ route }) => ({
          tabBarIcon: ({ color }) => (
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
        component={SettingsStack}
        options={({ route }) => ({
          tabBarIcon: ({ color }) => (
            <TabBarIcon route={route.name} color={color} />
          ),

        })}
      />
    </Tab.Navigator>
  );
}
