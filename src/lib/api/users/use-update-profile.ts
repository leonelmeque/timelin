import firestore from "@react-native-firebase/firestore";
import auth, {type FirebaseAuthTypes} from "@react-native-firebase/auth"

export const useUpdateProfile = () => {
  const currentUser = auth().currentUser as FirebaseAuthTypes.User;

  const updateProfileName = async (name: string) => currentUser?.updateProfile({
      displayName: name,
    });

  const updateUsername = async (username: string) => firestore()
      .collection('users')
      .doc(currentUser?.uid)
      .update({
        username,
      });

  const updateProfilePhoto = async (photoURL: string) => currentUser?.updateProfile({
      photoURL,
    });

  const updateBirthDate = async (birthdate: string) => firestore()
      .collection('users')
      .doc(currentUser?.uid)
      .update({
        birthdate,
      });

  const updatePhoneNumber = async (countryCode: string, number: string) => firestore()
      .collection('users')
      .doc(currentUser?.uid)
      .update({
        phonenumber: {
          countryCode,
          number,
        },
      });

  const updatePassword = async (password: string) =>  currentUser?.updatePassword(password);

  const sendResetPasswordEmail = async () =>  auth()
      ?.sendPasswordResetEmail(currentUser?.email as string);

  const updateEmail = async (email: string) => currentUser?.updateEmail(email);

  const sendEmailVerification = async () => currentUser?.sendEmailVerification();

  /**
   * @linkcode https://stackoverflow.com/questions/37811684/how-to-create-credential-object-needed-by-firebase-web-user-reauthenticatewith
   */
  const reauthenticatePassword = async (password: string) => {
    const credential = auth.EmailAuthProvider.credential(
      currentUser.email as string,
      password
    );
    return currentUser.reauthenticateWithCredential(credential);
  };

  const deleteUser = async () => currentUser?.delete();

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
    reauthenticatePassword,
  } as const;
};
