import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { initReactI18next } from "react-i18next";
import { FC } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Alert } from "react-native";
import i18next from "i18next";
import { Tabs } from "./src/routes/tab-routes";
import {
  CustomModalProvider,
  useUserContext,
  AuthenticatedUserProvider,
} from "./src/context";
import AuthStack from "./src/routes/auth.routes";
import { useInitApplication } from "./src/hooks/useInitApplication";
import { hooks } from "./src/lib";
import { theme } from "./src/ui/theme";
import translations from "./public/translations/translations.json";

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
  return user ? <Tabs /> : <AuthStack />;
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
              <IsUserAuthenticated />
            </NavigationContainer>
          </CustomModalProvider>
        </AuthenticatedUserProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
