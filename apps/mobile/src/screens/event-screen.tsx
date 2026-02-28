import { GestureResponderEvent, Pressable, View } from 'react-native';
import { CustomSafeAreaView } from '../components/safe-area-view';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { EventView } from '../components/event-view';
import { HeaderActions } from '../components/header-actions';
import { api } from '../lib';
import { useTimeline } from '../store';
import { Text } from '@/components/ui/text';
import { Header } from '@/components/header';

export const EventScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string; eventId: string }>();
  const todoId = params.id;
  const eventId = params.eventId;
  const { handleDeleteTimeline } = useTimeline();

  const onPressDeleteEvent =
    (id: string) => async (e: GestureResponderEvent) => {
      try {
        await api.timeline.deleteTimelineEvent(todoId, id);
        handleDeleteTimeline(id);
        router.back();
      } catch (error) {
        alert((error as Error).message);
      }
    };

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
          <HeaderActions onPressDelete={onPressDeleteEvent(eventId ?? "")} />
        )}
      />
      <View className="h-4" />
      <EventView event={null} todoUID={todoId} />
    </CustomSafeAreaView>
  );
};
