import { CustomSafeAreaView } from '../components/safe-area-view';
import { TodoProps } from '@todo/commons';
import { Header, Spacer, Text } from '@todo/mobile-ui';
import { FC } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SearchView } from '../components/search-view';
import { Pressable } from 'react-native';

type SearchScreenProps = {
  Params: {
    todos: TodoProps[] | null;
  };
};

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
            <Text size="body">Back</Text>
          </Pressable>
        )}
        renderRigthContent={() => <Text size="body">Search</Text>}
      />
      <Spacer size="8" />
      <SearchView data={todos} />
    </CustomSafeAreaView>
  );
};
