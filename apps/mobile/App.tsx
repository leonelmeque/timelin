import { ThemeProvider } from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { hooks, theme } from '@todo/commons';
import { Tabs } from './src/routes/tab-routes';
import { CustomModalProvider } from './src/context';
import AuthStack from './src/routes/auth.routes';

export default function App() {
  const [activeTheme] = hooks.useThemeSwitcher();
  return (
    <ThemeProvider
      theme={activeTheme === 'light' ? theme[activeTheme] : theme[activeTheme]}
    >
      <CustomModalProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <AuthStack />
          </NavigationContainer>
        </SafeAreaProvider>
      </CustomModalProvider>
    </ThemeProvider>
  );
}
