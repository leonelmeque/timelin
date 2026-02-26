import { createContext, FC, PropsWithChildren } from 'react';

const Context = createContext<'light' | 'dark'>('light');

const Provider: FC<PropsWithChildren> = ({ children }) => (
  <Context.Provider value="light">{children}</Context.Provider>
);

Provider.displayName = 'ThemeProvider';

export { Context as ThemeContext, Provider as ThemeProvider };
