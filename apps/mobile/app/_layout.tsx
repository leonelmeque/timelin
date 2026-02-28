import { useEffect } from "react";
import { Slot, useSegments, useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { initReactI18next } from "react-i18next";

import * as SplashScreen from "expo-splash-screen";
import i18next from "i18next";
import {
  CustomModalProvider,
  useUserContext,
  AuthenticatedUserProvider,
} from "../src/context";
import { PomodoroProvider, usePomodoroContext } from "../src/context/pomodoro-context";
import { PomodoroFloatingWidget } from "../src/components/pomodoro-timer/floating-widget";
import { useInitApplication } from "../src/hooks/useInitApplication";
import translations from "../public/translations/translations.json";

i18next.use(initReactI18next).init({
  resources: translations,
  lng: "en",
  interpolation: { escapeValue: false },
});

SplashScreen.preventAutoHideAsync().catch(() => {});

function GlobalPomodoroWidget() {
  const { phase, displayTime, activeTodoId, activeTodoName, pomodoroCount, pause, resume, stop, skipBreak, takeBreak } = usePomodoroContext();

  if (phase === 'idle' || !activeTodoId) return null;

  return (
    <PomodoroFloatingWidget
      phase={phase}
      displayTime={displayTime}
      todoId={activeTodoId}
      todoName={activeTodoName}
      pomodoroCount={pomodoroCount}
      onPause={pause}
      onResume={resume}
      onStop={stop}
      onSkipBreak={skipBreak}
      onTakeBreak={takeBreak}
    />
  );
}

function AuthGate({ appIsReady }: { appIsReady: boolean }) {
  const [user] = useUserContext();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!appIsReady) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)/sign-in");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [user, segments[0], appIsReady]);

  return null;
}

function InnerLayout() {
  const { appIsReady, onLayoutRootView, currentUser } = useInitApplication();

  return (
    <SafeAreaProvider onLayout={appIsReady ? onLayoutRootView : undefined}>
      <AuthenticatedUserProvider initUser={currentUser}>
        <CustomModalProvider>
          <PomodoroProvider>
            <AuthGate appIsReady={appIsReady} />
            <Slot />
            {appIsReady && <GlobalPomodoroWidget />}
          </PomodoroProvider>
        </CustomModalProvider>
      </AuthenticatedUserProvider>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return <InnerLayout />;
}
