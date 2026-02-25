import { registerRootComponent } from 'expo';
import { createStore, Provider as JotaiProvider } from 'jotai';
import { Platform } from 'react-native';
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

async function enableMocking() {
  if (Platform.OS !== 'web' || process.env.NODE_ENV === 'production') {
    return;
  }
  try {
    const { worker } = await import('./src/mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
    console.log('[MSW] Mock service worker started');
  } catch (err) {
    console.warn('[MSW] Could not start mock service worker:', err);
  }
}

enableMocking().then(() => {
  registerRootComponent(Main);
});
