import { FlatList, Pressable } from 'react-native';
import { EventBubble } from './event-bubble';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { TimelineEventProps } from '../../lib';
import { View } from 'react-native';
import { cn } from '@/lib/cn';

export const ListEvents = ({ data, ...rest }: { data: any }) => {
  const router = useRouter();
  const { todoUID } = useLocalSearchParams<{ todoUID: string }>();

  const handleNavigation = (event: TimelineEventProps) => {
    router.push(`/timeline/${todoUID}/event/${event.id}`);
  };
  const bgBasedOnPosition = (index: number) => {
    if (index === 0) {
      return '#eff7ee';
    }
    return '#F0EFF7';
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
      ItemSeparatorComponent={() => <View className="h-4" />}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      renderItem={renderItem}
      className={cn('flex-1')}
      {...rest}
    />
  );
};
