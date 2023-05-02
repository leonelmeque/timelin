import React, { FC, useCallback } from 'react';
import { Avatar } from '../../atoms/avatar';
import { Badge } from '../../atoms/badge';
import { Palette } from '../../atoms/palette';
import { Spacer } from '../../atoms/spacer';
import { Text } from '../../atoms/typography';
import {
  AvatarsContainer,
  BadgeContainer,
  TodoCardContainer,
  TodoCardContent,
  TodoCardHeader,
} from './styles';
import { TodoProps, hooks, tokens } from '../../../lib';
import { dateFormatter } from 'lib/utils';

interface TodoCardProps extends Omit<TodoProps, 'assigned'> {
  assigned?: string[];
  showStatus?: boolean;
  showDescription?: boolean;
  badgeType?: 'colored' | 'simple';
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
  badgeType = 'simple',
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
          {dateFormatter(Number(timestamp))}
        </Text>
        {showStatus && (
          <BadgeContainer>
            <Badge status={status} type={badgeType} />
          </BadgeContainer>
        )}
      </TodoCardHeader>
      <TodoCardContent>
        <Text size="large" weight="bold" numberOfLines={1}>
          {todo}
        </Text>
        {showDescription && (
          <>
            <Spacer size="4" />
            <Text size="small" weight="regular" numberOfLines={2}>
              {description}
            </Text>
            <Spacer size="8" />
          </>
        )}
      </TodoCardContent>
      <AvatarsContainer>{avatars()}</AvatarsContainer>
    </TodoCardContainer>
  );
};

TodoCard.displayName = 'TodoCard';
