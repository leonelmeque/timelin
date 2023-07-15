import { Pressable } from 'react-native';
import { CustomSafeAreaView } from '../components/safe-area-view';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { TimelineView } from '../components/timeline-view';
import { MaterialIcons } from '@expo/vector-icons';
import { useCallback } from 'react';
import { Header } from '../ui/organisms';
import { Spacer, Text } from '../ui/atoms';

const BackButton = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const TimelineScreen = () => {
  const navigation = useNavigation();

  const handleBackButton = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <CustomSafeAreaView>
      <Header
        renderLeftContent={() => (
          <Pressable onPress={handleBackButton}>
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
          <Text size="body" weight="bold">
            Timeline
          </Text>
        )}
      />
      <Spacer size="8" />
      <TimelineView />
    </CustomSafeAreaView>
  );
};
