import { useState, useContext } from 'react';
import { ThemeContext } from '../context';

export const useThemeSwitcher = () => {
  const currentTheme = useContext(ThemeContext);
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>(
    currentTheme
  );

  const toggleTheme = () => {
    if (activeTheme === 'dark') {
      setActiveTheme('light');
    } else {
      setActiveTheme('dark');
    }
  };

  return [activeTheme, toggleTheme] as const;
};
