import firebase from 'firebase/app';
import 'firebase/firestore';

export const getUserProfile = () => {
  const currentUser = firebase.auth().currentUser;

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
