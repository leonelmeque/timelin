import { useState } from 'react';
import { api } from '../api';
import firebase from 'firebase';
import { useUpdateProfile } from '../api/users/use-update-profile';
import { User } from '../shared-types';
import { useUserContext } from '../../context';

type HandleImageUpload = (params: {
  path: string;
  size: number;
}) => Promise<void>;

export const useImageUpload = () => {
  const [percentage, setPercentage] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { updateProfilePhoto } = useUpdateProfile();
  const [user, userDispatch] = useUserContext();

  const taskProgress = (snapshot: firebase.storage.UploadTaskSnapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    console.log(`Upload progress so far: `, progress);
  };

  const taskError = (error: firebase.storage.FirebaseStorageError) => {
    console.error(`Something has gone wrong: ${error}`);
    setIsUploading(false);
  };

  const taskComplete =
    (task: firebase.storage.UploadTaskSnapshot) => async () => {
      const uri = await task.ref.getDownloadURL();

      await updateProfilePhoto(uri);

      userDispatch({
        ...user,
        avatar: uri,
      } as User);
      setIsUploading(false);
      console.log('Image upload completed');
    };

  const handleImageUpload: HandleImageUpload = async ({ path, size }) => {
    setIsUploading(true);

    const snapshot = await api.storage.uploadImage(path, {
      customMetadata: {
        timestamp: String(new Date().getTime()),
      },
    });

    if (percentage) {
      setPercentage(0);
    }

    snapshot.task.on(
      'state_changed',
      taskProgress,
      taskError,
      taskComplete(snapshot)
    );
  };

  return {
    percentage,
    isUploading,
    handleImageUpload,
  };
};
