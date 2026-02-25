import { FlatList, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { EventBubble } from './event-bubble';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { TimelineEventProps } from '../../lib';
import { Palette, Spacer } from '../../ui/atoms';

export const ListEvents = styled(({ data, ...rest }: { data: any }) => {
  const router = useRouter();
  const { todoUID } = useLocalSearchParams<{ todoUID: string }>();

  const handleNavigation = (event: TimelineEventProps) => {
    router.push(`/timeline/${todoUID}/event/${event.id}`);
  };
  const bgBasedOnPosition = (index: number) => {
    if (index === 0) {
      return Palette.success.S50;
    }
    return Palette.primary.P50;
  };

  const renderItem = ({ item, index }: any) => (
    <Pressable
      key={index}
      onPress={() => handleNavigation(item)}
      style={{ flex: 1 }}
    >
      <EventBubble
        description={item.description}
        title={item.title}
        colour={bgBasedOnPosition(index)}
      />
    </Pressable>
  );
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <Spacer size="8" />}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      renderItem={renderItem}
      {...rest}
    />
  );
})`
  flex: 1;
`;
