import { DefaultTheme } from "styled-components/native";
import { tokens } from "../ui/tokens";

export const lightTheme: DefaultTheme = {
  colours: { ...tokens.colours.light },
  sizes: tokens.sizes,
  typography: tokens.typography
}

export const darkTheme: DefaultTheme = {
  colours: { ...tokens.colours.light },
  sizes: tokens.sizes,
  typography: tokens.typography
}


