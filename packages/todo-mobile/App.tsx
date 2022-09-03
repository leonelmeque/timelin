import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, View } from 'react-native'
import Button from './src/components/atoms/Button/Button'
import { ThemeProvider } from 'styled-components/native'
import { lightTheme, darkTheme } from './src/utils/theme'
import { useThemeSwitcher } from './src/hooks/use-theme-switcher'
import { ThemeContext } from './src/context'
import Layout from './src/components/atoms/Layout/Layout'

export default function App() {
  const [activeTheme, themeToggler] = useThemeSwitcher()
  return (
    <ThemeProvider theme={activeTheme === 'light' ? lightTheme : darkTheme}>
      <ThemeContext>
        <SafeAreaView>
          <StatusBar style="auto" />
          <Layout>
            <Button label='React native is great' variant='secondary' size='md' />
            <Button label='Switch Theme' variant='primary' size='lg' onPress={() => {
              themeToggler()
            }} />
          </Layout>
        </SafeAreaView>
      </ThemeContext>
    </ThemeProvider>
  )
}
