import { FC } from 'react';
import { BadgeBGColor } from '../../shared-types';
import { Text } from '../typography';
import { StyledBadge } from './styles';

export const Badge: FC<{ status: keyof typeof BadgeBGColor }> = ({
  status,
}) => (
  <StyledBadge bg={BadgeBGColor[status]}>
    <Text size="small" weight="medium">
      {(
        status.substring(0, 1).toUpperCase() +
        status.substring(1, status.length).toLocaleLowerCase()
      ).replace(/_/g, ' ')}
    </Text>
  </StyledBadge>
);

Badge.displayName = 'Badge';
