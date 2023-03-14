import { registerRootComponent } from 'expo';

import App from './App';
import { AuthenticatedUserProvider } from './src/context';

function Main() {
  return (
    <AuthenticatedUserProvider>
      <App />
    </AuthenticatedUserProvider>
  );
}

registerRootComponent(Main);
