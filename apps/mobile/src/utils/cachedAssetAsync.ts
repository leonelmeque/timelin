import { Asset } from 'expo-asset';

type Params = {
  images?: any[];
};

function cacheImages(images: any[]) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Asset.fromModule(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export const cachedAssetAsync = async ({ images = [] }: Params) => {
  return Promise.all([...cacheImages(images)]);
};
