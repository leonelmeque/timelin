import { registerRootComponent } from 'expo';
import { createStore, Provider as JotaiProvider } from 'jotai';
import App from './App';
import { setupMocks } from './src/mocks/browser';

if (process.env.NODE_ENV !== 'production') {
  setupMocks();
}

const store = createStore();

function Main() {
  return (
    <JotaiProvider store={store}>
      <App />
    </JotaiProvider>
  );
}

registerRootComponent(Main);
