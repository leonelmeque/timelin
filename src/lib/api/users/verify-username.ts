import firestore from "@react-native-firebase/firestore";

export const verifyUsername = async (username: string) => {
  const res = await firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return res.docs.length > 0;
};
