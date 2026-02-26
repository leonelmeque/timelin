import { Alert, Share } from 'react-native';

export const onShare = async (
  message: string,
  title?: string,
  url?: string
) => {
  try {
    const result = await Share.share({
      message,
      title,
      url,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
      } else {
      }
    } else if (result.action === Share.dismissedAction) {
    }
  } catch (err: any) {
    Alert.alert(err.message);
  }
};
