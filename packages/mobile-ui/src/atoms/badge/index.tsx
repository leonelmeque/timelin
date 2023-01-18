import { FC } from 'react';
import { BadgeBGColor, BadgeTextColor } from '../../shared-types';
import { Text } from '../typography';
import { StyledBadge } from './styles';

export const Badge: FC<{ status: keyof typeof BadgeBGColor }> = ({
  status,
}) => (
  <>
    <StyledBadge bg={BadgeBGColor[status]}>
      <Text size="small" weight="bold" colour={BadgeTextColor[status]}>
        {status.toUpperCase().replace(/_/g, ' ')}
      </Text>
    </StyledBadge>
  </>
);

Badge.displayName = 'Badge';
