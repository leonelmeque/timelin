import firebase from "firebase";
import "firebase/auth";
import "firebase/storage";

export const deleteAccount = async () => {
  const uid = firebase.auth().currentUser?.uid;
  await firebase
    .firestore()
    .collection("todos")
    .doc(uid)
    .collection("lists")
    .doc()
    .delete();
  await firebase.firestore().collection("users").doc(uid).delete();
  await firebase
    .firestore()
    .collection("timelines")
    .doc(uid)
    .collection("events")
    .doc()
    .delete();
  await firebase.auth().currentUser?.delete();
};
