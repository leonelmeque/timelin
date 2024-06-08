import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth'

type UploadImage = (
  imagePath: string,
  metadata?: Partial< FirebaseStorageTypes.FullMetadata>
) => Promise<FirebaseStorageTypes.TaskSnapshot>;

export const uploadImage: UploadImage = async (imagePath, metadata) => {
  const res = await fetch(imagePath);
  const blob = await res.blob();

  const storageRef = storage().ref();

  return storageRef
    .child(
      `images/${auth().currentUser?.uid}/${Math.random().toString(36)}`
    )
    .put(blob, metadata);
};
