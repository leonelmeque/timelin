import auth from "@react-native-firebase/auth"

export const getUserProfile = () => {
  const {currentUser} = auth();

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
