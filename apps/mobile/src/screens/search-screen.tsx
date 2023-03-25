import { CustomSafeAreaView } from '../components/safe-area-view';
import { Header, Spacer, Text } from '@todo/mobile-ui';
import { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SearchView } from '../components/search-view';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

const BackButton = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const SearchScreen: FC = () => {
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
        renderRigthContent={() => <Text size="body">Search</Text>}
      />
      <Spacer size="8" />
      <SearchView />
    </CustomSafeAreaView>
  );
};
