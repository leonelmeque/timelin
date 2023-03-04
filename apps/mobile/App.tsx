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
import { useGetSessionStorage } from './src/hooks/useGetSessionToken';
import { FC } from 'react';

const IsUserAuthenticated: FC<any> = () => {
  useGetSessionStorage();
  const [user] = useUserContext();

  return user ? <Tabs /> : <AuthStack />;
};

export default function App() {
  const [activeTheme] = hooks.useThemeSwitcher();

  return (
    <ThemeProvider theme={theme[activeTheme]}>
      <AuthenticatedUserProvider>
        <CustomModalProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <IsUserAuthenticated />
            </NavigationContainer>
          </SafeAreaProvider>
        </CustomModalProvider>
      </AuthenticatedUserProvider>
    </ThemeProvider>
  );
}
