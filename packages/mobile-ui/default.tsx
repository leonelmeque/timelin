import React from 'react';
import { hooks, theme } from '@todo/commons';
import { ThemeProvider } from 'styled-components/native';
import StorybookUIRoot from './storybook';

export const Default = () => {
  const { useThemeSwitcher } = hooks;
  const [selectedTheme] = useThemeSwitcher();
  return (
    <ThemeProvider theme={theme[selectedTheme]}>
      <StorybookUIRoot />
    </ThemeProvider>
  );
};
