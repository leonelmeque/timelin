import { DefaultTheme } from "styled-components/native"

const light: DefaultTheme['colours'] = {
  primary: '#645CAA',
  secondary: '#A7D2CB',
  accent: '#F5EDDC',
  background: '#F5EDDC',
  white: '#FFFFFF',
  dark: '#16213E',
  danger: '#E94560',
}

const dark: DefaultTheme['colours'] = {
  primary: '#16213E',
  secondary: '#645CAA',
  accent: '#F5EDDC',
  background: '#F5EDDC',
  white: '#FFFFFF',
  dark: '#16213E',
  danger: '#E94560',
}

const colours = {
  light,
  dark
}

export { colours }