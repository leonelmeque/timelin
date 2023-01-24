import { Chip } from '@todo/mobile-ui';
import { FC } from 'react';
import { GestureResponderEvent, Pressable, PressableProps } from 'react-native';
import styled from 'styled-components/native';

interface StatusListProps {
  onPress?: (e: GestureResponderEvent, name: string) => void;
  activeStatus?: string;
}

const StatusListContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const StatusList: FC<StatusListProps> = ({
  onPress,
  activeStatus = 'todo',
}) => {
  const status = ['todo', 'ongoing', 'on_hold', 'completed'];

  if (!onPress) {
    throw new Error('onPress prop is undefined, please add a function');
  }

  const renderStatusList = () =>
    status.map((value, index) => (
      <Pressable key={index} onPress={(e) => onPress(e, value)}>
        <Chip
          isActive={value === activeStatus}
          label={(
            value.substring(0, 1).toUpperCase() +
            value.substring(1, value.length)
          ).replace(/_/g, ' ')}
        />
      </Pressable>
    ));

  return <StatusListContainer>{renderStatusList()}</StatusListContainer>;
};

StatusList.displayName = 'StatusList';
