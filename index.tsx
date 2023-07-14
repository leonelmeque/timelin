import { registerRootComponent } from 'expo';
import { createStore, Provider as JotaiProvider } from 'jotai';
import App from './App';
import { initializeFirebaseApplication } from "./src/lib/utils/firebase";


initializeFirebaseApplication();

const store = createStore();

function Main() {
  return (
    <JotaiProvider store={store}>
      <App />
    </JotaiProvider>
  );
}

registerRootComponent(Main);
