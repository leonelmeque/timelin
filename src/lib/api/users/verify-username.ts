import firestore from "@react-native-firebase/firestore";
import "firebase/storage";

export const verifyUsername = async (username: string) => {
  const res = await firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return res.docs.length > 0;
};
