import { Box, Spacer } from '../atoms';
import { Skeleton } from '../molecules/skeleton';
import styled from 'styled-components/native';

const Horizontal = styled.View`
  flex-direction: row;
`;

export const HomeScreenTemplate = () => (
  <Box>
    <Skeleton>
      <Skeleton.Placeholder width={50} height={50} variant="rectangle" />
      <Spacer size="16" />
      <Skeleton.Placeholder width={100} height={10} variant="rectangle" />
      <Spacer size="8" />
      <Horizontal>
        <Skeleton.Placeholder width={150} height={130} variant="rectangle" />
        <Spacer size="8" />
        <Skeleton.Placeholder width={150} height={130} variant="rectangle" />
        <Spacer size="8" />
        <Skeleton.Placeholder width={150} height={130} variant="rectangle" />
      </Horizontal>
      <Spacer size="16" />
      <Skeleton.Placeholder width={100} height={10} variant="rectangle" />
      <Spacer size="8" />
      <Skeleton.Placeholder width={'100%'} height={150} variant="rectangle" />
      <Spacer size="16" />
      <Skeleton.Placeholder width={100} height={10} variant="rectangle" />
      <Spacer size="8" />
      <Skeleton.Placeholder width={'100%'} height={150} variant="rectangle" />
    </Skeleton>
  </Box>
);
