import { registerRootComponent } from 'expo';
import { createStore, Provider as JotaiProvider } from 'jotai';
// import { DevTools } from 'jotai-devtools';
import App from './App';
import { initializeFirebaseApplication } from '@todo/commons';

initializeFirebaseApplication();

const store = createStore();

function Main() {
  return (
    <JotaiProvider store={store}>
      {/* <DevTools store={store} /> */}
      <App />
    </JotaiProvider>
  );
}

registerRootComponent(Main);
