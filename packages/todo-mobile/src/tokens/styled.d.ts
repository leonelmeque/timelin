import { ColorProps } from "./colours";

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colours: {
      primary: string,
      secondary: string,
      accent: string,
      background: string,
      white: string,
      dark: string
    };
    sizes: {
      extraSmall: number,
      small: number,
      medium: number,
      large: number,
      extraLarge: number,
      big: number,
    },
    typography: {
      sizes: {
        small: number;
        body: number;
        large: number,
        heading: number,
      },
    }
  }
}