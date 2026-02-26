import { Dispatch, SetStateAction } from "react";
import { apiClient } from "../../../services/api-client";
import { authState, AuthUser } from "../../../services/auth-state";
import { User } from "../../shared-types";

export const userSignInWithPersistence = (
  callback: Dispatch<SetStateAction<User<{}> | null>>,
  onAppReady: Dispatch<SetStateAction<boolean>>
) => {
  const onStateObserver = async (user: AuthUser | null) => {
    if (!user) {
      onAppReady(true);
      return;
    }

    try {
      const userInformation = await apiClient.get<User>(`/users/${user.uid}`);
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
    } catch {
      // User data not found, continue anyway
    }

    onAppReady(true);
  };

  authState.onAuthStateChanged((user) => onStateObserver(user));
};
