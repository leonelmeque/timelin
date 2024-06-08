import { registerRootComponent } from 'expo';
import { createStore, Provider as JotaiProvider } from 'jotai';
import App from './App';
import  "./src/lib/utils/firebase";

const store = createStore();

function Main() {
  return (
    <JotaiProvider store={store}>
      <App />
    </JotaiProvider>
  );
}

registerRootComponent(Main);
