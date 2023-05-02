import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import styled from 'styled-components/native';
import { CustomSafeAreaView } from '../safe-area-view';
import { tokens } from '../../ui/tokens';
import { Badge, Spacer } from '../../ui/atoms';

export interface UpdateStatusModalRefProps {
  visibility: boolean;
  toggleModalVisibility: () => void;
}

type UpdateStatusModalProps = {
  initialSelection: string;
  onSelect: (value: string) => void;
};

const Container = styled.View`
  background-color: ${({ theme }) => theme.colours.neutrals.white};
  border-radius: ${({ theme }) => theme.spacing.size8}px;
  align-self: flex-end;
  padding: 10px;
  margin-bottom: 48px;
  box-shadow: ${({ theme }) => theme.shadow.L4};
  position: relative;
  z-index: 2;
`;

const Component = (
  { initialSelection, onSelect }: UpdateStatusModalProps,
  ref: ForwardedRef<UpdateStatusModalRefProps>
) => {
  const [visibility, setVisibility] = useState(false);
  const [selection, setSelection] = useState(initialSelection);

  const status = ['TODO', 'ON_GOING', 'ON_HOLD', 'COMPLETED'];

  const toggleModalVisibility = () => {
    setVisibility(!visibility);
  };

  const onSelectStatus = (value: string) => {
    setSelection(value);
    onSelect(value);
    toggleModalVisibility();
  };

  useImperativeHandle(ref, () => ({
    visibility,
    selection,
    toggleModalVisibility,
  }));

  const renderStatus = () =>
    status.map((_status, index) => (
      <Pressable
        key={_status + index}
        onPress={(e) => {
          onSelectStatus(_status);
        }}
      >
        <View key={_status}>
          {index !== 0 && <Spacer size="8" />}
          <Badge status={_status as any} type="colored" />
        </View>
      </Pressable>
    ));

  return (
    <Modal visible={visibility} transparent>
      <CustomSafeAreaView
        style={{
          backgroundColor: 'transparent',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Pressable
          onPress={() => {
            toggleModalVisibility();
          }}
          style={{
            position: 'relative',
            flexDirection: 'row',
            zIndex: 2,
            flex: 1,
            justifyContent: 'flex-end',
            paddingHorizontal: tokens.spacing.size16,
          }}
        >
          <Container>{renderStatus()}</Container>
        </Pressable>
      </CustomSafeAreaView>
    </Modal>
  );
};

export const UpdateStatusModalView = forwardRef(Component);
