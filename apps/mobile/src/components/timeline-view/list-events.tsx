import { Palette, Spacer } from '@todo/mobile-ui';
import { FlatList, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { EventBubble } from './event-bubble';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TimelineEventProps } from '@todo/commons';

export const ListEvents = styled(({ data, ...rest }: { data: any }) => {
  const navigation = useNavigation();
  const {
    params: { todoUID },
  } = useRoute<RouteProp<{ params: { todoUID: string } }>>();

  const handleNavigation = (event: TimelineEventProps) => {
    // @ts-ignore
    navigation.navigate('Timeline/Event', { event, todoUID });
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
