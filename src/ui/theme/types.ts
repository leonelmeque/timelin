type ColourLevel = '500' | '400' | '300' | '200' | '100' | '75' | '50';
type Spacing = '64' | '56' | '48' | '40' | '32' | '24' | '16' | '8' | '4';
type Shadow = 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
type TodoPalette = 'blue' | 'orange' | 'green' | 'pink' | 'yellow';

type Color<T extends string> = { [K in ColourLevel as `${T}${K}`]: string };

export interface DefaultTheme {
  colours: {
    primary: Color<'P'>;
    success: Color<'S'>;
    warning: Color<'W'>;
    danger: Color<'D'>;
    greys: Color<'G'>;
    neutrals: {
      dark: string;
      white: string;
    };
    todoPalette: { [K in TodoPalette]: string };
  };
  sizes: {
    extraSmall: number;
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
    big: number;
  };
  spacing: { [K in Spacing as `size${K}`]: number };
  typography: {
    sizes: {
      small: number;
      body: number;
      large: number;
      heading: number;
    };
    weight: {
      regular: string;
      bold: string;
      100: number;
      200: number;
      300: number;
      400: number;
      500: number;
      600: number;
      medium: number;
      800: number;
      900: number;
    };
  };
  shadow: { [K in Shadow]: string };
}
