import { Box, Spacer } from '../atoms';
import { Skeleton } from '../molecules/skeleton';

export const TodoScreenTemplate = () => (
  <Box>
    <Skeleton>
      <Spacer size='16' />
      <Skeleton.Placeholder height={20} width={200} variant="rectangle" />
      <Spacer size='8' />
      <Skeleton.Placeholder height={30} width={"90%"} variant="rectangle" />
      <Spacer size='16' />
      <Skeleton.Placeholder height={15} width={"80%"} variant="rectangle" />
      <Spacer size='8' />
      <Skeleton.Placeholder height={15} width={"90%"} variant="rectangle" />
      <Spacer size='8' />
      <Skeleton.Placeholder height={15} width={"60%"} variant="rectangle" />
      <Spacer size='16' />
      <Skeleton.Placeholder height={30} width={200} variant="rectangle" />
      <Spacer size='16' />
      <Skeleton.Placeholder height={15} width={"80%"} variant="rectangle" />
      <Spacer size='8' />
      <Skeleton.Placeholder height={15} width={"90%"} variant="rectangle" />
      <Spacer size='8' />
      <Skeleton.Placeholder height={15} width={"60%"} variant="rectangle" />
      <Spacer size='16' />
      <Skeleton.Placeholder height={30} width={200} variant="rectangle" />
      <Spacer size='16' />
      <Skeleton.Placeholder height={30} width={"20%"} variant="rectangle" />
      <Spacer size='16' />
    </Skeleton>
  </Box>
);
