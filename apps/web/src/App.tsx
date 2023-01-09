import './App.css';
import { hooks, theme } from '@todo/commons';
import { ThemeProvider } from 'styled-components';

function App() {
  const { useGreetings, useThemeSwitcher } = hooks;
  const [activeTheme, toggleTheme] = useThemeSwitcher();
  console.log(theme[activeTheme]);
  const response = useGreetings({ whoToGreet: 'Leonel' });
  return (
    <ThemeProvider theme={theme[activeTheme]}>
      <div className="App">
        <h2>
          <span>{response}</span>
        </h2>
        <button
          type="button"
          onClick={toggleTheme}
          style={{ background: theme[activeTheme].colours.primary }}
        >
          Switch theme
        </button>
      </div>
    </ThemeProvider>
  );
}

export default App;
