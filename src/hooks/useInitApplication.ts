import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { cachedAssetAsync } from '../utils';
import { User, api } from '../lib';

export const useInitApplication = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [currentUser, setCurrentUser] = useState<User<{}> | null>(null);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const loadAssetsAync = useCallback(async () => {
    try {
      await cachedAssetAsync({
        images: [
          require('../../assets/splash-screen.png'),
          require('../../assets/bg-login.jpg'),
        ],
      });
    } catch (err) {
      console.log(err);
    }
  }, [appIsReady]);

  const signInWithSessionToken = useCallback(async () => {
    try {
      const user = await api.users.userSignInWithPersistence();
      if (user) {
        const { displayName, email, photoURL } = api.users.getUserProfile();

        setCurrentUser({
          ...user,
          avatar: photoURL,
          email,
          fullname: displayName,
        } as User<{}>);
      }

      await Promise.resolve();
    } catch (err) {
      console.error(err);
      setAppIsReady(true);
    }
  }, [appIsReady]);

  useEffect(() => {
    console.log('Preparing application');
    const prepare = async () => {
      try {
        console.log('Loading assets');
        await loadAssetsAync();
        console.log('Loading assets done');
        console.log('Signing in with session token');
        await signInWithSessionToken();
        setAppIsReady(true);
        console.log('Signing in with session token done');
      } catch (error) {
        console.log(error);
      }
    };

    prepare();
  }, []);

  return { appIsReady, onLayoutRootView, currentUser } as const;
};
