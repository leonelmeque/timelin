import auth from "@react-native-firebase/auth"

export const userSignOut = async () => {
  await auth().signOut();
  await auth().currentUser?.delete();
};
