import React from 'react';
import { ThemeProvider as ActiveThemeProvider } from '@todo/commons';
import { Default } from './default';

export default function App() {
  return (
    <ActiveThemeProvider>
      <Default />
    </ActiveThemeProvider>
  );
}
