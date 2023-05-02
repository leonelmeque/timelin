import '@testing-library/jest-native'
import { render } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'
import { lightTheme } from './utils/theme'

// eslint-disable-next-line react/prop-types
export const AllProviderWrapper = ({ children }: { children: any }) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
)

const customRender = (ui: any, options: unknown) =>
  render(ui, { wrapper: AllProviderWrapper, ...(options as object) })

export * from '@testing-library/react-native'

export { customRender as render }
