import type { DefaultTheme } from '../theme/types';

const sizes: DefaultTheme['typography']['sizes'] = {
  small: 12,
  body: 16,
  large: 20,
  heading: 24,
};

const weight: DefaultTheme['typography']['weight'] = {
  '100': 100,
  '200': 200,
  '300': 300,
  '400': 400,
  '500': 500,
  '600': 600,
  medium: 500,
  '800': 800,
  '900': 900,
  bold: 'bold',
  regular: 'normal',
};

export const typography = {
  sizes,
  weight
};
