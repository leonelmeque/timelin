import React from 'react';
import { View } from 'react-native';

export const CenterView = (storyFn: () => any) => (
  <View
    style={{
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
    }}
  >
    {storyFn()}
  </View>
);
