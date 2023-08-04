import firebase from "firebase/app";
import "firebase/storage";

export const verifyUsername = async (username: string) => {
  const res = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return res.docs.length > 0;
};
