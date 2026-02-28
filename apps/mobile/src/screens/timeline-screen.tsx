import { Pressable, View } from 'react-native';
import { CustomSafeAreaView } from '../components/safe-area-view';
import { useRouter } from 'expo-router';
import { TimelineView } from '../components/timeline-view';
import { MaterialIcons } from '@expo/vector-icons';
import { useCallback } from 'react';
import { Header } from '@/components/header';
import { Text } from '@/components/ui/text';

export const TimelineScreen = () => {
  const router = useRouter();

  const handleBackButton = useCallback(() => {
    router.back();
  }, []);

  return (
    <CustomSafeAreaView>
      <Header
        renderLeftContent={() => (
          <Pressable onPress={handleBackButton}>
            <View className="items-center flex-row">
              <MaterialIcons name="arrow-back" size={24} />
              <View className="w-2" />
              <Text className="font-medium">
                Back
              </Text>
            </View>
          </Pressable>
        )}
        renderRightContent={() => (
          <Text className="font-bold">
            Timeline
          </Text>
        )}
      />
      <View className="h-4" />
      <TimelineView />
    </CustomSafeAreaView>
  );
};
