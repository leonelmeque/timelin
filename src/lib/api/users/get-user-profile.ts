import { authState } from '../../../services/auth-state';

export const getUserProfile = () => {
  const currentUser = authState.getUser();

  if (!currentUser) {
    return {};
  }

  const { uid, email, emailVerified, displayName, phoneNumber, photoURL } =
    currentUser;

  return {
    uid,
    email,
    emailVerified,
    displayName,
    phoneNumber,
    photoURL,
  } as const;
};
