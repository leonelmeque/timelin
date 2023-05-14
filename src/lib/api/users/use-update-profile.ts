import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

export const useUpdateProfile = () => {
  const currentUser = firebase.auth().currentUser;

  const updateProfileName = async (name: string) => {
    return await currentUser?.updateProfile({
      displayName: name,
    });
  };

  const updateUsername = async (username: string) => {
    return await firebase
      .firestore()
      .collection('users')
      .doc(currentUser?.uid)
      .update({
        username,
      });
  };

  const updateProfilePhoto = async (photoURL: string) => {
    return await currentUser?.updateProfile({
      photoURL,
    });
  };

  const updateBirthDate = async (birthdate: string) => {
    return await firebase
      .firestore()
      .collection('users')
      .doc(currentUser?.uid)
      .update({
        birthdate,
      });
  };

  const updatePhoneNumber = async (countryCode: string, number: string) => {
    return await firebase
      .firestore()
      .collection('users')
      .doc(currentUser?.uid)
      .update({
        phonenumber: {
          countryCode,
          number,
        },
      });
  };

  const updatePassword = async (password: string) => {
    return await currentUser?.updatePassword(password);
  };

  const sendResetPasswordEmail = async () => {
    return await firebase
      .auth()
      ?.sendPasswordResetEmail(currentUser?.email as string);
  };

  const updateEmail = async (email: string) => {
    return await currentUser?.updateEmail(email);
  };

  const sendEmailVerification = async () => {
    return await currentUser?.sendEmailVerification();
  };

  const deleteUser = async () => {
    return await currentUser?.delete();
  };

  return {
    updateProfileName,
    updateProfilePhoto,
    updateBirthDate,
    updatePassword,
    sendResetPasswordEmail,
    updateEmail,
    updatePhoneNumber,
    sendEmailVerification,
    deleteUser,
    updateUsername,
  } as const;
};
