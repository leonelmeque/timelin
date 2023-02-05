import { RouteProp, useRoute } from '@react-navigation/native';
import { hooks } from '@todo/commons';
import { Box, Palette, Text } from '@todo/mobile-ui';
import { FC } from 'react';
import { View } from 'react-native';
import { TimelineDefaultView } from './default-view';

type Route = {
  Params: {
    id: string;
  };
};

export const TimelineView: FC = () => {
  const { params } = useRoute<RouteProp<Route>>();
  const [timeline, todo] = hooks.useFetchTimeline(params.id);
  const timelineData = Object.entries(timeline || []);

  return (
    <Box
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          marginLeft: 84,
          paddingBottom: 16,
        }}
      >
        <Text size="large" weight="medium" numberOfLines={3}>
          {todo}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 12,
          paddingBottom: 16,
        }}
      >
        <Text size="small" weight="medium">
          Timeline
        </Text>
        <View
          style={{
            paddingRight: 26,
          }}
        />
        <Text size="small" weight="medium">
          Events
        </Text>
      </View>
      <View
        style={{
          overflow: 'hidden',
          flex: 1,
        }}
      >
        {timeline && <TimelineDefaultView data={timelineData} />}
      </View>
      <View>
        <Text size="body" weight="medium" colour={Palette.primary.P300}>
          Update Progress
        </Text>
      </View>
    </Box>
  );
};
