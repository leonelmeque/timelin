import { DefaultTheme } from "styled-components/native";
import { colours, typography, sizes } from "../tokens";


export const lightTheme: DefaultTheme = {
  colours: { ...colours.light },
  sizes,
  typography
}

export const darkTheme: DefaultTheme = {
  colours: { ...colours.dark },
  sizes,
  typography
}


