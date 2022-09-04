import { createContext, FC, useContext } from "react";

const Context = createContext<'light' | 'dark'>('light');

export const Provider: FC = ({ children }) => (
  <Context.Provider value="light">{children}</Context.Provider>
)

export const useThemeContext = () => {
  const currentTheme = useContext(Context);
  return currentTheme;
}