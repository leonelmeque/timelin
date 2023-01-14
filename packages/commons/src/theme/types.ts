type ColourLevel = '500' | '400' | '300' | '200' | '100';
type Color = { [K in ColourLevel]: string };

export interface DefaultTheme {
  colours: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    white: string;
    dark: string;
    danger: string;
  };
  sizes: {
    extraSmall: number;
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
    big: number;
  };
  typography: {
    sizes: {
      small: number;
      body: number;
      large: number;
      heading: number;
    };
  };
}
