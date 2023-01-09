import { tokens } from '../tokens';
import { DefaultTheme } from './types';

const { colours, sizes, typography } = tokens;

const lightTheme: DefaultTheme = {
  colours: { ...colours.light },
  sizes,
  typography,
};

const darkTheme: DefaultTheme = {
  colours: { ...colours.dark },
  sizes,
  typography,
};

export const theme = { light: lightTheme, dark: darkTheme };
