import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

type OpenImagePicker = () => Promise<ImagePicker.ImagePickerAsset | null>;

export const useImagePicker = () => {
  const [permissions, requestPermissions] =
    ImagePicker.useMediaLibraryPermissions({
      request: true,
    });

  const openImagePicker: OpenImagePicker = async () => {
    if (!permissions?.granted) {
      requestPermissions();
      return null;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      return result?.assets[0];
    }

    return null;
  };

  return {
    openImagePicker,
  };
};
