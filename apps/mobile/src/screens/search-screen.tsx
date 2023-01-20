import { CustomSafeAreaView } from '../components/safe-area-view';
import { TodoProps } from '@todo/commons';
import { Header, Spacer } from '@todo/mobile-ui';
import { FC } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SearchView } from '../components/search-view';

type SearchScreenProps = {
  Params: {
    todos: TodoProps[] | null;
  };
};

export const SearchScreen: FC = () => {
  const {
    params: { todos },
  } = useRoute<RouteProp<SearchScreenProps>>();

  return (
    <CustomSafeAreaView style={{ flex: 1 }}>
      <Header />
      <Spacer size="8" />
      <SearchView data={todos} />
    </CustomSafeAreaView>
  );
};
