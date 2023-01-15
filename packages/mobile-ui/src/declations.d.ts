import { DefaultTheme as Theme } from '@todo/commons/dist/theme/types';

declare module 'styled-components/native' {
  interface DefaultTheme extends Theme {}
}
declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
