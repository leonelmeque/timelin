import { CustomSafeAreaView } from '../components/safe-area-view';
import { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SearchView } from '../components/search-view';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../ui/organisms';
import { Spacer, Text } from '../ui/atoms';

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
              <Text size="body" weight="medium">
                Back
              </Text>
            </BackButton>
          </Pressable>
        )}
        renderRigthContent={() => (
          <Text size="body" weight="bold">
            Search
          </Text>
        )}
      />
      <Spacer size="8" />
      <SearchView />
    </CustomSafeAreaView>
  );
};
