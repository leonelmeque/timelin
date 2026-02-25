import { Slot, useRouter, useSegments } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { initReactI18next } from "react-i18next";
import { createStore, Provider as JotaiProvider } from "jotai";
import * as SplashScreen from "expo-splash-screen";
import i18next from "i18next";
import { useEffect } from "react";
import {
  CustomModalProvider,
  useUserContext,
  AuthenticatedUserProvider,
} from "../src/context";
import { useInitApplication } from "../src/hooks/useInitApplication";
import { hooks } from "../src/lib";
import { theme } from "../src/ui/theme";
import translations from "../public/translations/translations.json";

i18next.use(initReactI18next).init({
  resources: translations,
  lng: "en",
  interpolation: { escapeValue: false },
});

SplashScreen.preventAutoHideAsync().catch(() => {});

const store = createStore();

function AuthRedirect() {
  const [user] = useUserContext();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)/sign-in");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [user, segments]);

  return <Slot />;
}

function InnerLayout() {
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
            <AuthRedirect />
          </CustomModalProvider>
        </AuthenticatedUserProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <JotaiProvider store={store}>
      <InnerLayout />
    </JotaiProvider>
  );
}
