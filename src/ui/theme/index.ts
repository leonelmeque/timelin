import { tokens } from '../tokens';
import { DefaultTheme } from './types';

const { colours, sizes, typography, spacing, shadow } = tokens;

const common = {
  typography,
  sizes,
  spacing,
  shadow,
};

const lightTheme: DefaultTheme = {
  colours: { ...colours.light },
  ...common,
};

const darkTheme: DefaultTheme = {
  colours: { ...colours.dark },
  ...common,
};

export { DefaultTheme }
export const theme = { light: lightTheme, dark: darkTheme };
