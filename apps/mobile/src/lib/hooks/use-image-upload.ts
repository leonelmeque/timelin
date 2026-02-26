import { useState } from 'react';
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

  const handleImageUpload: HandleImageUpload = async ({ path }) => {
    setIsUploading(true);

    try {
      if (percentage) {
        setPercentage(0);
      }

      const result = await api.storage.uploadImage(path);

      await updateProfilePhoto(result.downloadURL);

      userDispatch({
        ...user,
        avatar: result.downloadURL,
      } as User);

      console.log('Image upload completed');
    } catch (error) {
      console.error('Something has gone wrong:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    percentage,
    isUploading,
    handleImageUpload,
  };
};
