import { dateFormatter, TodoProps, tokens, UserProps } from '@todo/commons';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Avatar } from '../../atoms/avatar';
import { Badge } from '../../atoms/badge';
import { Palette } from '../../atoms/palette';
import { Spacer } from '../../atoms/spacer';
import { Text } from '../../atoms/typography';
import { BadgeBGColor } from '../../shared-types';
import { BadgeContainer, TodoCardContainer } from './styles';

interface TodoCardProps extends Omit<TodoProps, 'assigned'> {
  assigned: UserProps[];
}

export const TodoCard: FC<TodoCardProps> = ({
  color,
  todo,
  timestamp,
  status,
  description,
  assigned,
}) => (
  <TouchableOpacity>
    <TodoCardContainer
      cardColor={color as keyof typeof tokens.colours.light.todoPalette}
    >
      <BadgeContainer>
        <Badge status={status as keyof typeof BadgeBGColor} />
      </BadgeContainer>
      <Text size="large" weight="bold">
        {todo}
      </Text>
      <Spacer size="8" />
      <Spacer size="4" />
      <Text size="small" weight="regular">
        {description}
      </Text>
      <Spacer size="8" />
      <Spacer size="4" />
      <Text size="small" weight="bold" colour={Palette.greys.G200}>
        {dateFormatter(timestamp)}
      </Text>
      {assigned?.map(({ avatar }) => {
        return (
          <Avatar imageUrl={avatar} radius={'full'} size={tokens.sizes.small} />
        );
      })}
    </TodoCardContainer>
  </TouchableOpacity>
);

TodoCard.displayName = 'TodoCard';
