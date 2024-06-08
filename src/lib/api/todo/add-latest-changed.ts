import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth"

export const addLatestChanged = async (uid: string) => firestore()
    .collection("todos")
    .doc(auth().currentUser?.uid)
    .set({
      latestChanged: uid,
    });
