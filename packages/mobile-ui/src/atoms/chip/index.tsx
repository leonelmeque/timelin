import { FC } from 'react';
import { Palette } from '../palette';
import { Text } from '../typography';
import { Container } from './styles';

interface ChipProps {
  label: string;
  isActive: boolean;
}

export const Chip: FC<ChipProps> = ({ label, isActive, ...rest }) => (
  <Container colour={isActive ? Palette.primary.P50 : 'transparent'} {...rest}>
    <Text size="body" weight="medium" colour={Palette.greys.G200}>
      {label}
    </Text>
  </Container>
);

Chip.displayName = 'Chip';
