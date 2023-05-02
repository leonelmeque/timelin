import { FlatList } from 'react-native';
import styled from 'styled-components/native';

export const TodoList = styled(FlatList)`
  flex: 1;
  max-height: ${(props) => (props.horizontal ? `200px` : 'auto')};
  border-radius: 19px;
  margin: 14px 14px;
  padding: 2px 2px;
`;
