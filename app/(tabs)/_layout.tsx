import { Tabs } from "expo-router";
import { useCustomModal } from "../../src/context";
import { FloatingToolbar } from "../../src/components/floating-toolbar";

export default function TabsLayout() {
  const [, dispatch] = useCustomModal();

  return (
    <Tabs
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
      <Tabs.Screen
        name="index"
        options={{ title: "Home" }}
      />
      <Tabs.Screen
        name="add"
        options={{ title: "Add" }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            dispatch(true);
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: "Settings" }}
      />
    </Tabs>
  );
}
