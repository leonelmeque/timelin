import { ThemeProvider } from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { lightTheme, darkTheme } from './src/utils/theme'
import { useThemeSwitcher } from './src/hooks/use-theme-switcher'
import { ThemeContext } from './src/context'
import TodoListStack from './src/routes/todo-routes'

export default function App() {
  const [activeTheme] = useThemeSwitcher()
  return (
    <ThemeProvider theme={activeTheme === 'light' ? lightTheme : darkTheme}>
      <ThemeContext>
        <SafeAreaProvider>
          <NavigationContainer>
            <TodoListStack />
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeContext>
    </ThemeProvider>
  )
}
