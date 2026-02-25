import { GestureResponderEvent, Pressable } from 'react-native';
import { CustomSafeAreaView } from '../components/safe-area-view';
import styled from 'styled-components/native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { EventView } from '../components/event-view';
import { HeaderActions } from '../components/header-actions';
import { api } from '../lib';
import { useTimeline } from '../store';
import { Spacer, Text } from '../ui/atoms';
import { Header } from '../ui/organisms';

const BackButton = styled.View`
  align-items: center;
  flex-direction: row;
`;
export const EventScreen = () => {
  const router = useRouter();
  const { todoId, eventId } = useLocalSearchParams<{ todoId: string; eventId: string }>();
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
            <BackButton>
              <MaterialIcons name="arrow-back" size={24} />
              <Spacer size="4" />
              <Text size="body" weight="medium">
                Back
              </Text>
            </BackButton>
          </Pressable>
        )}
        renderRigthContent={() => (
          <HeaderActions onPressDelete={onPressDeleteEvent(eventId ?? "")} />
        )}
      />
      <Spacer size="8" />
      <EventView event={null} todoUID={todoId} />
    </CustomSafeAreaView>
  );
};
