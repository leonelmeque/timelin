import firebase from "firebase/app";
import "firebase/auth";
import { getUserInformation } from "./get-user-information";
import { User } from "../../shared-types";
import { Dispatch, SetStateAction } from "react";

export const userSignInWithPersistence = (
  callback: Dispatch<SetStateAction<User<{}> | null>>,
  onAppReady: Dispatch<SetStateAction<boolean>>
) => {
  const onStateObserver = async (user: firebase.User | null) => {
    if (!user) {
      onAppReady(true);
      return;
    }

    const userInformation = await getUserInformation(user.uid);
    const { displayName, email, photoURL } = user;

    callback(
      () =>
      ({
        ...userInformation,
        avatar: photoURL,
        fullname: displayName,
        email,
      } as User<{}>)
    );

    onAppReady(true);
  };

  const onStateObserverError = (err: firebase.auth.Error) => {
    onAppReady(true);
    throw err;
  };

  firebase.auth().onAuthStateChanged(onStateObserver, onStateObserverError);
};
