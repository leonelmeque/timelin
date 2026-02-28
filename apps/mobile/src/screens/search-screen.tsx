import { CustomSafeAreaView } from '../components/safe-area-view';
import { FC } from 'react';
import { useRouter } from 'expo-router';
import { SearchView } from '../components/search-view';
import { Pressable, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '@/components/header';
import { Text } from '@/components/ui/text';

export const SearchScreen: FC = () => {
  const router = useRouter();

  return (
    <CustomSafeAreaView>
      <Header
        renderLeftContent={() => (
          <Pressable onPress={() => router.back()}>
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
            Search
          </Text>
        )}
      />
      <View className="h-4" />
      <SearchView />
    </CustomSafeAreaView>
  );
};
