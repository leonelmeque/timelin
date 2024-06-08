import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth"

export const getLastestChanged = async () => {
  const ref = await firestore()
    .collection('todos')
    .doc(auth().currentUser?.uid)
    .get();

  return ref.data();
};
