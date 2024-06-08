import auth, {type FirebaseAuthTypes} from "@react-native-firebase/auth";
import { Dispatch, SetStateAction } from "react";
import { getUserInformation } from "./get-user-information";
import { User } from "../../shared-types";

export const userSignInWithPersistence = (
  callback: Dispatch<SetStateAction<User<{}> | null>>,
  onAppReady: Dispatch<SetStateAction<boolean>>
) => {
  const onStateObserver = async (user: FirebaseAuthTypes.User | null ) => {
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
      } as User<any>)
    );

    onAppReady(true);
  };

  // const onStateObserverError = (err: FirebaseError) => {
  //   onAppReady(true);
  //   throw err;
  // };

  auth().onAuthStateChanged((user) => onStateObserver(user));
};
