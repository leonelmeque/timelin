import { FC } from 'react';
import { GestureResponderEvent, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { Chip } from '../../ui/atoms';

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
  activeStatus = 'TODO',
}) => {
  const status = ['TODO', 'ON_GOING', 'ON_HOLD', 'COMPLETED'];

  if (!onPress) {
    throw new Error('onPress prop is undefined, please add a function');
  }

  const renderStatusList = () =>
    status.map((value, index) => (
      <Pressable key={index} onPress={(e) => onPress(e, value)}>
        <Chip
          isActive={value === activeStatus}
          label={(
            value.substring(0, 1) +
            value.substring(1, value.length).toLocaleLowerCase()
          ).replace(/_/g, ' ')}
        />
      </Pressable>
    ));

  return <StatusListContainer>{renderStatusList()}</StatusListContainer>;
};

StatusList.displayName = 'StatusList';
