import { api } from '@todo/commons';
import { signInWithCustomToken } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { useUserContext } from '../context';
import { auth } from '../utils/firebase';
import { getSessionToken } from '../utils/storage';
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

  const signInWithSessionToken = useCallback(async () => {
    try {
      const token = await getSessionToken();
    
      if (token) {
        const userRecord = await signInWithCustomToken(auth, token);
        const { _message, result } = await api.users.getUserInformation(
          userRecord.user.uid
        );

        dispatch(result);
      }
    } catch (err) {
      console.error(err);
    }
  }, [appIsReady]);

  useEffect(() => {
    const prepare = async () => {
      try {
        await loadAssetsAync();
        if (!user) await signInWithSessionToken();
      } catch (error) {
        console.log(error);
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  return { appIsReady, onLayoutRootView } as const;
};
