import { Tabs } from "expo-router";
import { useCustomModal } from "../../src/context";
import { FloatingToolbar } from "../../src/components/floating-toolbar";
import { useResponsive } from "../../src/hooks/use-responsive";

export default function TabsLayout() {
  const [, dispatch] = useCustomModal();
  const { showSidebar } = useResponsive();

  return (
    <Tabs
      tabBar={(props) => showSidebar ? null : <FloatingToolbar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: showSidebar
          ? { display: 'none' as const }
          : {
              position: 'absolute' as const,
              backgroundColor: 'transparent',
              borderTopWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
            },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
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
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
