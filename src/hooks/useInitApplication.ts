import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { cachedAssetAsync } from "../utils";
import { User, api } from "../lib";

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
          require("../../assets/splash-screen.png"),
          require("../../assets/bg-login.jpg"),
        ],
      });
    } catch (err) {
      console.log(err);
    }
  }, [appIsReady]);

  const signInWithSessionToken = useCallback(() => {
    try {
      api.users.userSignInWithPersistence(setCurrentUser, setAppIsReady);
    } catch (err) {
      console.error(err);
    }
  }, [appIsReady]);

  useEffect(() => {
    const prepare = async () => {
      console.log("Preparing application");
      try {
        await loadAssetsAync();
      } catch (error) {
        console.log(error);
      }
    };

    prepare().then(() => {
      signInWithSessionToken();
      console.log("Finish loading application");
    });
  }, []);

  return { appIsReady, onLayoutRootView, currentUser } as const;
};
