import { registerRootComponent } from 'expo';
import { createStore, Provider as JotaiProvider } from 'jotai';
// import { DevTools } from 'jotai-devtools';
import App from './App';
import { AuthenticatedUserProvider } from './src/context';

const store = createStore();

function Main() {
  return (
    <JotaiProvider store={store}>
      {/* <DevTools store={store} /> */}
      <AuthenticatedUserProvider>
        <App />
      </AuthenticatedUserProvider>
    </JotaiProvider>
  );
}

registerRootComponent(Main);
