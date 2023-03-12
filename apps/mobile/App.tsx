import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { hooks, theme } from '@todo/commons';
import { Tabs } from './src/routes/tab-routes';
import {
  AuthenticatedUserProvider,
  CustomModalProvider,
  useUserContext,
} from './src/context';
import AuthStack from './src/routes/auth.routes';
import { FC } from 'react';
import './src/utils/firebase';
import { useInitApplication } from './src/hooks/useInitApplication';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const IsUserAuthenticated: FC<any> = () => {
  const [user] = useUserContext();

  return user ? <Tabs /> : <AuthStack />;
};

export default function App() {
  const [activeTheme] = hooks.useThemeSwitcher();

  const { appIsReady, onLayoutRootView } = useInitApplication();

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme[activeTheme]}>
      <AuthenticatedUserProvider>
        <SafeAreaProvider onLayout={onLayoutRootView}>
          <CustomModalProvider>
            <NavigationContainer>
              <IsUserAuthenticated />
            </NavigationContainer>
          </CustomModalProvider>
        </SafeAreaProvider>
      </AuthenticatedUserProvider>
    </ThemeProvider>
  );
}
