import { ThemeProvider } from 'styled-components/native'
import { lightTheme, darkTheme } from './src/utils/theme'
import { useThemeSwitcher } from './src/hooks/use-theme-switcher'
import { ThemeContext } from './src/context'
import TodosScreen from './src/screens/todos-screen'

export default function App() {
  const [activeTheme, themeToggler] = useThemeSwitcher()
  return (
    <ThemeProvider theme={activeTheme === 'light' ? lightTheme : darkTheme}>
      <ThemeContext>
        <TodosScreen />
      </ThemeContext>
    </ThemeProvider>
  )
}
