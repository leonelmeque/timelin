import { Header, Spacer, Text } from '@todo/mobile-ui';
import { Pressable } from 'react-native';
import { CustomSafeAreaView } from '../components/safe-area-view';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { TimelineView } from '../components/timeline-view';
import { MaterialIcons } from '@expo/vector-icons';

const BackButton = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const TimelineScreen = () => {
  const navigation = useNavigation();

  return (
    <CustomSafeAreaView>
      <Header
        renderLeftContent={() => (
          <Pressable onPress={() => navigation.goBack()}>
            <BackButton>
              <MaterialIcons name="arrow-back" size={24} />
              <Spacer size="4" />
              <Text size="body">Back</Text>
            </BackButton>
          </Pressable>
        )}
        renderRigthContent={() => <Text size="body">Timeline</Text>}
      />
      <Spacer size="8" />
      <TimelineView />
    </CustomSafeAreaView>
  );
};
