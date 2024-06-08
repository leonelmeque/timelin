import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth"

export const removePinnedTodo = async (id: string) => firestore()
    .collection('todos')
    .doc(auth().currentUser?.uid)
    .update({
      pinned: '',
    });
