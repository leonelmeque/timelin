import { createRoot } from 'react-dom/client';
import './index.css';
import { ClickToComponent } from 'click-to-react-component';
import { ThemeProvider } from '@todo/commons';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <>
    <ClickToComponent />
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </>
);
