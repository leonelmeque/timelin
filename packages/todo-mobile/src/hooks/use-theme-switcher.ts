import { useState } from "react";
import { useThemeContext } from "../context/theme-context";

export const useThemeSwitcher = () => {
  const currentTheme = useThemeContext()
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>(currentTheme)

  const toggleTheme = () => {
    if (activeTheme === 'dark') {
      setActiveTheme('light')
    } else {
      setActiveTheme('dark')
    }
  }

  return [activeTheme, toggleTheme] as const
}