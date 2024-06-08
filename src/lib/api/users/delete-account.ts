import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth"

export const deleteAccount = async () => {
  const uid = auth().currentUser?.uid;
  await firestore()
    .collection("todos")
    .doc(uid)
    .collection("lists")
    .doc()
    .delete();
  await firestore().collection("users").doc(uid).delete();
  await firestore()
    .collection("timelines")
    .doc(uid)
    .collection("events")
    .doc()
    .delete();
  await auth().currentUser?.delete();
};
