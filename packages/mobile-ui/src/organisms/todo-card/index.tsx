import { dateFormatter, hooks, TodoProps, tokens } from '@todo/commons';
import { FC, useCallback } from 'react';
import { Avatar } from '../../atoms/avatar';
import { Badge } from '../../atoms/badge';
import { Palette } from '../../atoms/palette';
import { Spacer } from '../../atoms/spacer';
import { Text } from '../../atoms/typography';
import { BadgeBGColor } from '../../shared-types';
import {
  AvatarsContainer,
  BadgeContainer,
  TodoCardContainer,
  TodoCardContent,
  TodoCardHeader,
} from './styles';

interface TodoCardProps extends Omit<TodoProps, 'assigned'> {
  assigned?: string[];
  showStatus?: boolean;
  showDescription?: boolean;
}

export const TodoCard: FC<TodoCardProps> = ({
  color,
  todo,
  timestamp,
  status,
  description,
  showStatus,
  showDescription,
  assigned,
}) => {
  const assignedAvatars = hooks.useFetchAvatar<typeof assigned>(assigned);

  const avatars = useCallback(
    () =>
      assignedAvatars?.map((avatar, index) => (
        <Avatar
          key={index}
          style={{
            borderWidth: 1,
            borderColor: Palette.greys.G200,
            right: (index - 1) * 5,
            position: 'relative',
            zIndex: -index,
          }}
          source={{ uri: avatar.avatar }}
          radius={'full'}
          size={tokens.sizes.extraLarge}
        />
      )),
    [assignedAvatars]
  );

  return (
    <TodoCardContainer
      cardColor={color as keyof typeof tokens.colours.light.todoPalette}
    >
      <TodoCardHeader>
        <Text size="small" weight="medium" colour={Palette.greys.G200}>
          {dateFormatter(timestamp)}
        </Text>
        {showStatus && (
          <BadgeContainer>
            <Badge status={status as keyof typeof BadgeBGColor} />
          </BadgeContainer>
        )}
      </TodoCardHeader>
      <TodoCardContent>
        <Text size="large" weight="bold">
          {todo}
        </Text>
        {showDescription && (
          <>
            <Spacer size="4" />
            <Text size="small" weight="regular">
              {description}
            </Text>
            <Spacer size="4" />
          </>
        )}
      </TodoCardContent>
      <AvatarsContainer>{avatars()}</AvatarsContainer>
    </TodoCardContainer>
  );
};

TodoCard.displayName = 'TodoCard';
