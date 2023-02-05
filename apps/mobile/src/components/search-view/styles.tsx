import { Box } from '@todo/mobile-ui';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const SearchViewDefault = styled(Box)`
  height: ${Dimensions.get('screen').height / 2}px;
  align-items: center;
  justify-content: center;
`;

export const SearchViewResultsView = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
`;
