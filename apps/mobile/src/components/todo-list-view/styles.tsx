import { FlatList } from 'react-native';
import styled from 'styled-components/native';

export const TodoList = styled(FlatList)`
  flex: 1;
  height: 100px;
  padding: ${({ theme: { spacing } }) =>
    `${spacing.size16}px ${spacing.size16}px ${spacing.size64}px`};
`;
