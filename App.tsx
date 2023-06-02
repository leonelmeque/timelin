import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  CustomModalProvider,
  useUserContext,
  AuthenticatedUserProvider,
} from "./src/context";
import AuthStack from "./src/routes/auth.routes";
import { FC } from "react";
import { useInitApplication } from "./src/hooks/useInitApplication";
import * as SplashScreen from "expo-splash-screen";
import { hooks } from "./src/lib";
import { theme } from "./src/ui/theme";
import { Alert } from "react-native";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "./public/translations/translations.json";
import TodoListStack from "./src/routes/todo-routes";
import { AddTodoModalView } from "./src/components/add-todo-modal-view";

i18next.use(initReactI18next).init({
  resources: translations,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

SplashScreen.preventAutoHideAsync()
  .then(() => { })
  .catch((err) => {
    Alert.alert("Something has gone wrong, please restart application");
  });

const IsUserAuthenticated: FC<any> = () => {
  const [user] = useUserContext();
  return user ? <TodoListStack /> : <AuthStack />;
};

export default function App() {
  const [activeTheme] = hooks.useThemeSwitcher();

  const { appIsReady, onLayoutRootView, currentUser } = useInitApplication();

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme[activeTheme]}>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <AuthenticatedUserProvider
          key={currentUser ? 1 : 0}
          initUser={currentUser}
        >
          <CustomModalProvider>
            <NavigationContainer>
              <AddTodoModalView />
              <IsUserAuthenticated />
            </NavigationContainer>
          </CustomModalProvider>
        </AuthenticatedUserProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
