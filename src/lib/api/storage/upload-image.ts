import firebase from 'firebase/app';
import 'firebase/storage';

type UploadImage = (
  imagePath: string,
  metadata?: firebase.storage.UploadMetadata
) => Promise<firebase.storage.UploadTaskSnapshot>;

export const uploadImage: UploadImage = async (imagePath, metadata) => {
  const res = await fetch(imagePath);
  const blob = await res.blob();

  const storageRef = firebase.storage().ref();

  return storageRef
    .child(
      `images/${firebase.auth().currentUser?.uid}/${Math.random().toString(36)}`
    )
    .put(blob, metadata);
};
