import { registerRootComponent } from 'expo';
import { RecoilRoot } from 'recoil';
import App from './App';
import { AuthenticatedUserProvider } from './src/context';

function Main() {
  return (
    <RecoilRoot>
      <AuthenticatedUserProvider>
        <App />
      </AuthenticatedUserProvider>
    </RecoilRoot>
  );
}

registerRootComponent(Main);
