import { ThemeProvider } from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useThemeSwitcher } from './src/hooks/use-theme-switcher'
import { hooks, theme } from '@todo/commons';
import TodoListStack from './src/routes/todo-routes';

export default function App() {
  const [activeTheme] = hooks.useThemeSwitcher();
  return (
    <ThemeProvider
      theme={activeTheme === 'light' ? theme[activeTheme] : theme[activeTheme]}
    >
      <SafeAreaProvider>
        <NavigationContainer>
          <TodoListStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
