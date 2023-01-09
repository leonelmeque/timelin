import { DefaultTheme as Theme } from '@todo/commons/dist/theme/types';

declare module 'styled-components/native' {
  export interface DefaultTheme extends Theme {}
}
