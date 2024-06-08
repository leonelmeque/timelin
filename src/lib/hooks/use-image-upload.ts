import { useState } from 'react';
import type { FirebaseStorageTypes } from '@react-native-firebase/storage';
import { ReactNativeFirebase } from "@react-native-firebase/app";
import { api } from '../api';
import { useUpdateProfile } from '../api/users/use-update-profile';
import { User } from '../shared-types';
import { useUserContext } from '../../context';

type ImageFileProps = {
  path: string;
  size: number;
}

type HandleImageUpload = (params: ImageFileProps) => Promise<void>;

export const useImageUpload = () => {
  const [percentage, setPercentage] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { updateProfilePhoto } = useUpdateProfile();
  const [user, userDispatch] = useUserContext();

  const taskProgress = (snapshot: FirebaseStorageTypes.TaskSnapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    console.log(`Upload progress so far: `, progress);
  };

  const taskError = (error: ReactNativeFirebase.NativeFirebaseError) => {
    console.error(`Something has gone wrong: ${error}`);
    setIsUploading(false);
  };

  const taskComplete =
    (task: FirebaseStorageTypes.TaskSnapshot) => async () => {
      const uri = await task.ref.getDownloadURL();

      await updateProfilePhoto(uri);

      userDispatch({
        ...user,
        avatar: uri,
      } as User);
      setIsUploading(false);
      console.log('Image upload completed');
    };

  const handleImageUpload: HandleImageUpload = async ({ path}) => {
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
