import { CustomSafeAreaView } from '../components/safe-area-view';
import { TodoProps } from '@todo/commons';
import { Header, Spacer, Text } from '@todo/mobile-ui';
import { FC } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SearchView } from '../components/search-view';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

type SearchScreenProps = {
  Params: {
    todos: TodoProps[] | null;
  };
};

const BackButton = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const SearchScreen: FC = () => {
  const {
    params: { todos },
  } = useRoute<RouteProp<SearchScreenProps>>();
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
      <SearchView data={todos} />
    </CustomSafeAreaView>
  );
};
