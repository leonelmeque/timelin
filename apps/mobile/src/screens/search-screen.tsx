import { CustomSafeAreaView } from '../components/safe-area-view';
import { TodoProps } from '@todo/commons';
import { Header, Spacer, Text } from '@todo/mobile-ui';
import { FC } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SearchView } from '../components/search-view';
import { Pressable } from 'react-native';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import styled from 'styled-components/native';

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
    <CustomSafeAreaView style={{ flex: 1 }}>
      <Header
        renderLeftContent={() => (
          <Pressable onPress={() => navigation.goBack()}>
            <BackButton>
              <ArrowLeft />
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
