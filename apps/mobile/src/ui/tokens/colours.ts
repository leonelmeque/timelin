import type { DefaultTheme } from '../theme/types';

const light: DefaultTheme['colours'] = {
  primary: {
    P500: '#3D3868',
    P400: '#464077',
    P300: '#645CAA',
    P200: '#7E78B8',
    P100: '#A5A0CE',
    P75: '#BFBCDC',
    P50: '#F0EFF7',
  },
  success: {
    S500: '#386d36',
    S400: '#407d3e',
    S300: '#5bb259',
    S200: '#77bf75',
    S100: '#a0d29f',
    S75: '#bcdfbb',
    S50: '#eff7ee',
  },
  warning: {
    W500: '#84712e',
    W400: '#988235',
    W300: '#d9ba4c',
    W200: '#dfc66a',
    W100: '#e9d797',
    W75: '#efe3b6',
    W50: '#fbf8ed',
  },
  danger: {
    D500: '#842e39',
    D400: '#983541',
    D300: '#d94c5d',
    D200: '#df6a79',
    D100: '#e997a1',
    D75: '#efb6bd',
    D50: '#fbedef',
  },
  greys: {
    G500: '#0d0c10',
    G400: '#0f0e12',
    G300: '#15141a',
    G200: '#3d3c41',
    G100: '#77777a',
    G75: '#9f9fa1',
    G50: '#e8e8e8',
  },
  neutrals: {
    dark: '#15141A',
    white: '#FFFFFF',
  },
  todoPalette: {
    blue: '#E0EEFD',
    green: '#E9FBF3',
    orange: '#FDEEE0',
    pink: '#FDE7F0',
    yellow: '#FAFBE9',
  },
};

/**
 * @description There is no dark theme yet for our designs, this is for future use only
 */
const dark: DefaultTheme['colours'] = {
  ...light,
};

const colours = {
  light,
  dark,
};

export { colours };
