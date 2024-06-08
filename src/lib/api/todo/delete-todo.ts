import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth"

export const deleteTodo = async (id: string) => {
  firestore()
    .collection('todos')
    .doc(auth().currentUser?.uid)
    .collection('list')
    .doc(id)
    .delete();
};
