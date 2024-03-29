import { GestureResponderEvent, Pressable } from 'react-native';
import { CustomSafeAreaView } from '../components/safe-area-view';
import styled from 'styled-components/native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { EventView } from '../components/event-view';
import { HeaderActions } from '../components/header-actions';
import { TimelineEventProps, api } from '../lib';
import { useTimeline } from '../store';
import { Spacer, Text } from '../ui/atoms';
import { Header } from '../ui/organisms';

const BackButton = styled.View`
  align-items: center;
  flex-direction: row;
`;
type RouteParams = {
  params: { event: TimelineEventProps | null; todoUID: string };
};

export const EventScreen = () => {
  const navigation = useNavigation();
  const {
    params: { event = null, todoUID },
  } = useRoute<RouteProp<RouteParams>>();
  const { handleDeleteTimeline } = useTimeline();

  const onPressDeleteEvent =
    (id: string) => async (e: GestureResponderEvent) => {
      try {
        await api.timeline.deleteTimelineEvent(todoUID, id);
        handleDeleteTimeline(id);
        navigation.goBack();
      } catch (error) {
        alert((error as Error).message);
      }
    };

  return (
    <CustomSafeAreaView>
      <Header
        renderLeftContent={() => (
          <Pressable onPress={() => navigation.goBack()}>
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
          <HeaderActions onPressDelete={onPressDeleteEvent(event?.id ?? "")} />
        )}
      />
      <Spacer size="8" />
      <EventView event={event} todoUID={todoUID} />
    </CustomSafeAreaView>
  );
};
