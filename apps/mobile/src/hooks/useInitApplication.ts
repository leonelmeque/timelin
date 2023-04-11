import { User, api } from '@todo/commons';
import { useCallback, useEffect, useState } from 'react';
import { useUserContext } from '../context';
import * as SplashScreen from 'expo-splash-screen';
import { cachedAssetAsync } from '../utils';

export const useInitApplication = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [user, dispatch] = useUserContext();

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

  const signInWithSessionToken = useCallback(() => {
    try {
      api.users.userSignInWithPersistence((userData: User) => {
        if (userData) {
          dispatch(userData);
        }
        setAppIsReady(true);
      });
    } catch (err) {
      console.error(err);
    }
  }, [appIsReady]);

  useEffect(() => {
    const prepare = async () => {
      try {
        await loadAssetsAync();
        if (!user) signInWithSessionToken();
      } catch (error) {
        console.log(error);
      }
    };

    prepare();
  }, []);

  return { appIsReady, onLayoutRootView } as const;
};
